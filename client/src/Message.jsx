import React, {Component} from 'react';

const UserName = ({ users, message }) => {
  if(message.hasOwnProperty('username')){
    const user = users.filter(user => (user.name.includes(message.username) ) ? true : false );
    const style = { color: user[0].color };

    return(<span className="message-username" style={style}>{message.username}</span>);
  }
  return undefined;
};

class Message extends Component {
  render() {

    const username = this.props.message.username && (
      <UserName users={this.props.users} message={this.props.message}/>
      );

    switch(this.props.message.type){
      case 'incomingMessage':
        return (
          <div className="message">
            {username}
            <span className="message-content">{this.props.message.content}</span>
          </div>
        );
        break;

      case 'incomingMessageImg':
        return (
          <div className="message">
            {username}
            <img className="message-content" src={this.props.message.content}/>
          </div>
        );
        break;

      case 'incomingNotification':
        return (
          <div className="notification">
            <span className="notification-content">{this.props.message.content}</span>
          </div>
        );
        break;
    }
  }
}
export default Message;