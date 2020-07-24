import React, { Component } from 'react';
import style from './style.module.css'
export default class InputBox extends Component {

  state = {
    content: ""
  }

  componentDidMount() {
    document.addEventListener('keydown', e => {
      console.log(e.keyCode)
      if(e.keyCode === 13) {
        this.handleSubmit()
      }
    })
  }
  handleChange = (e) => {
    this.setState({
      content: e.currentTarget.value
    })
  }

  handleSubmit = () => {
    const { content } = this.state;
    this.props.onSubmit(content)
    this.setState({
      content: ""
    })
  }

  render() {
    const { content } = this.state;
    return <div className={style.container}>
      <input className={style.input} placeholder="请输入问题" onChange={this.handleChange} value={content}/>
      <button className={style.button} onClick={this.handleSubmit} disabled={content.trim() === ''}>发送</button>
    </div>
  }
}