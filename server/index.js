const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

// I'm maintaining all active connections in this object
const clients = {};
const users = {};
let userActivity = [];

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

const sendMessage = (json, userId) => {
  // We are sending the current data to all connected clients
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });

  // clients[userId].sendUTF(json)
}

const typesDef = {
  USER_EVENT: "userevent",
  USER_MSG: "usermsg"
}

wsServer.on('request', function(request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
  connection.on('message', function(message) {
    console.log(message)
    if (message.type === 'utf8') {
      const dataFromClient = JSON.parse(message.utf8Data);
      const json = { type: dataFromClient.type, data: dataFromClient.content  };
      if (dataFromClient.type === typesDef.USER_EVENT) {
        
        users[userID] = dataFromClient;
        userActivity.push(`${dataFromClient.userId} 已上线`);
        json.data = { users, userActivity };
      } else if(dataFromClient.type === typesDef.USER_MSG) {
        content = dataFromClient.content;
        userId = dataFromClient.userId
        json.data = { content, userId, }
      }
      sendMessage(JSON.stringify(json));
    }
  });
  // user disconnected
  connection.on('close', function(connection) {
    console.log((new Date()) + " Peer " + userID + " disconnected.");
    const json = { type: typesDef.USER_EVENT };
    userActivity.push(`${users[userID].userId} 下线`);
    json.data = { users, userActivity };
    delete clients[userID];
    delete users[userID];
    sendMessage(JSON.stringify(json));
  });
});
