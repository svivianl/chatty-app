import React, {Component} from 'react';
import { getStyle } from '../helpers/index.js';

const Message = ({ users, message }) => {
  const style = getStyle( users, message );
  const addUsername = style && (
    <span className='message-username' style={style}>{message.username}</span>);

  return (
    <div className='message'>
      {addUsername}
      <span className='message-content'>{message.content}</span>
    </div>
  );
}
export default Message;