import React, {Component} from 'react';
import { getStyle } from '../helpers/index.js';

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
        <span className="message-content">{message.content}</span>
      </div>
    );
  }
};

class Message extends Component {
  render() {
    return (
      <MessageTag users={this.props.users} message={this.props.message}/>
    );
  }
}
export default Message;