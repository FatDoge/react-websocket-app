import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Tabbar from './components/Tabbar'
import Content from './components/Content'
import InputBox from './components/InputBox'
import { getLocationParams } from '../src/utils'

const client = new W3CWebSocket('ws://127.0.0.1:8000');

class App extends Component {
  state = {
    messages: [],
    userId: getLocationParams().userId
  }
  componentWillMount() {
    client.onopen = () => {
     console.log('WebSocket Client Connected');
    this.logInUser()

    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log(dataFromServer)
      this.handleMsg(dataFromServer)
    };
  }


  /* When a user joins, I notify the
server that a new user has joined to edit the document. */
logInUser = () => {
  const { userId } = this.state;
  if (userId.trim()) {
    const data = {
      userId
    };
    this.setState({
      ...data
    }, () => {
      client.send(JSON.stringify({
        ...data,
        type: "userevent"
      }));
    });
  }
}

handleMsg = ({type, data}) => {
  const { messages, userId } = this.state;
  if(type === 'usermsg') {
    this.setState({
      messages: messages.concat({
        ...data,
        isSelf: data.userId === userId
      })
    })
  }
}

handleSubmit = content => {
  const { userId } = this.state;
  client.send(JSON.stringify({
    type: "usermsg",
    content: content,
    userId: userId
  }));
}
  
  render() {
    const { messages } = this.state;
    return (
      <div>
        <Tabbar/>
        <Content messages={messages}/>
        <InputBox onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

export default App;