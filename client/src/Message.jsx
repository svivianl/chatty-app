import React, {Component} from 'react';

class Message extends Component {
  render() {

    let message = null;
    if(this.props.message.type === 'incomingMessage') {

      const user = this.props.users.filter(user => (user.name.includes(this.props.message.username) ) ? true : false );
      const style = { color: user[0].color };

      return (
        <div className="message">
          <span className="message-username" style={style}>{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      );

    }else{
      return (
        <div className="notification">
          <span className="notification-content">{this.props.message.content}</span>
        </div>
      );
    }
  }
}
export default Message;