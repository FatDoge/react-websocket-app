import React, { Component } from 'react';
import style from './style.module.css'
import Loading from '../Loading'

export default class Message extends Component {
  state = {
    loading: {}
  }

  componentDidMount() {
    console.log(this.props)
    this.setState({
      loading: {
        ...this.state.loading,
        [this.props.id]: true
      }
    }
    , () => {
      setTimeout(() => {
        this.setState({
          loading: {
            ...this.state.loading,
            [this.props.id]: false
          }
        })
      }, 1620)
    }
    )
  }

  render() {
    const { isSelf = false, content, userId, id } = this.props;
    const { loading } = this.state;
    return <>

      <div className={isSelf ? style.selfContainer : style.container}>
        <span>{userId}</span>
        {loading[id] ?
          <Loading isSelf={isSelf}/> : <p>{content}</p>
        }

      </div>
    </>
  }
}  