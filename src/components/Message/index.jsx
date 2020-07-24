import React, { Component } from 'react';
import style from './style.module.css'
import Loading from '../Loading'

export default class Message extends Component {
  constructor(props) {
    super(props)
    this.message = React.createRef()
  }
  state = {
    loading: {}
  }

  componentDidMount() {
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
        }, () => this.message.current.scrollIntoView({
          behavior: 'smooth'
        }))
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
          <Loading isSelf={isSelf}/> : <p ref={ this.message }>{content}</p>
        }

      </div>
    </>
  }
}  