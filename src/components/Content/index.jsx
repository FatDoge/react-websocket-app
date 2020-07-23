import React, { Component } from 'react';
import style from './style.module.css'
import Message from '../Message'

export default class Content extends Component {
  render() {
    const { messages = [] } = this.props
    return <div className={style.container}>
      {
        messages.map((el, index) => (
          <Message key={index} id={index} isSelf={el.isSelf} content={el.content} userId={el.userId}/>
        ))
      }
    </div>
  }
}