import React, {Component} from 'react';
import { getStyle } from '../helpers/index.js';

class Message extends Component {
  render() {
    const style = getStyle( this.props.users, this.props.message );
    const addUsername = style && (
      <span className="message-username" style={style}>{this.props.message.username}</span>);

    return (
      <div className="message">
        {addUsername}
        <span className="message-content">{this.props.message.content}</span>
      </div>
    );
  }
}
export default Message;