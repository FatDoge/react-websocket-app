import React, { Component } from 'react';
import style from './style.module.css'

export default class Loading extends Component {
  render() {
  const { isSelf } = this.props;
    return <div className={isSelf ? style.selfBox:style.box}>
      <div className={style.loader14}></div>
    </div>
  }
}