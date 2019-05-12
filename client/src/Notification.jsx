import React, {Component} from 'react';

const Notification = ({ message }) => {
  return (
    <div className='notification-content'>{message.content}</div>
  );
}
export default Notification;