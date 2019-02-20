import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../styles/MessageFromState.css'

class MessageFromState extends Component {
  handleMessageClick = () => {
    this.props.history.push({
      state: undefined
    })
  }

  render() {
    return (
      <div className='MessageFromState__message-ctr'
        onClick={this.handleMessageClick}>
       {this.props.location.state
        ? this.props.location.state.message
            ? <div className='MessageFromState__message'>
                <i className='material-icons'>check_circle_outline</i>
                {this.props.location.state.message}
                </div>
            : null
        : null}
      </div>
    )
  }
}

export default withRouter(MessageFromState)
