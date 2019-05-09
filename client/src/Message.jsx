import React, {Component} from 'react';

// const UserName = ({ users, message }) => {
//   if(message.hasOwnProperty('username')){
//     const user = users.filter(user => (user.name.includes(message.username) ) ? true : false );
//     const style = { color: user[0].color };

//     return(<span className="message-username" style={style}>{message.username}</span>);
//   }
//   return undefined;
// };

const getStyle = ( users, message ) => {
  if(message.hasOwnProperty('username')){
    const user = users.filter(user => (user.name.includes(message.username) ) ? true : false );
    return { color: user[0].color };
  }
  return null;
};

const MessageTag = ({ users, message }) => {
  const style = getStyle( users, message );
  if(style){

    return (
      <div className="message">
        <span className="message-username" style={style}>{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
    );
  }else{
    return (
      <div className="message">
        <div className="message-img">
          <span className="message-content">{message.content}</span>
        </div>
      </div>
    );
  }
};

const MessageImg = ({ users, message }) => {
  const style = getStyle( users, message );
  if(style){

    return (
      <div className="message">
        <span className="message-username" style={style}>{message.username}</span>
        <div className="message-img">
          <img className="message-content" src={message.content}/>
        </div>
      </div>
    );
  }else{
    return (
      <div className="message message-img">
        <div>
          <img className="message-content" src={message.content}/>
        </div>
      </div>
    );
  }
};

class Message extends Component {
  render() {

    // const username = this.props.message.username && (
    //   <UserName users={this.props.users} message={this.props.message}/>
    // );

    switch(this.props.message.type){
      case 'incomingMessage':
        return (
          <MessageTag users={this.props.users} message={this.props.message}/>
        );
        break;

      case 'incomingMessageImg':
        return (
          <MessageImg users={this.props.users} message={this.props.message}/>
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