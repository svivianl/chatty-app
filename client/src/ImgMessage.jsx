import React, {Component} from 'react';
import { getStyle } from '../helpers/index.js';

const ImgMessage = ({ users, message }) => {
  const style = getStyle( users, message );
  const addUsername = style && (
    <span className='message-username' style={style}>{message.username}</span>);

  return (
    <div className='message'>
      {addUsername}
      <div>
        <img className='message-content' src={message.content}/>
      </div>
    </div>
  );
}
export default ImgMessage;