import React, { Component } from 'react';
import style from './style.module.css'

export default class Loading extends Component {
  constructor(props) {
    super(props)
    this.loading = React.createRef()
  }

  componentDidMount() {
    this.loading.current.scrollIntoView({
      behavior: 'smooth'
    })
  }
  render() {
  const { isSelf } = this.props;
    return <div ref={this.loading} className={isSelf ? style.selfBox:style.box}>
      <div className={style.loader14}></div>
    </div>
  }
}