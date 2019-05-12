import React, {Component} from 'react';
import Message            from './Message.jsx';
import ImgMessage         from './ImgMessage.jsx';
import Notification       from './Notification.jsx';

const MessageList = ({ users, messages }) => {
  const htmlMessages = messages.map(message => {

    switch(message.type){
      case 'incomingMessage':
        return(<Message key={message.id} users={users} message={message}/>);
        break;

      case 'incomingMessageImg':
        return(<ImgMessage key={message.id} users={users} message={message}/>);
        break;

      case 'incomingNotification':
        return(<Notification key={message.id} message={message}/>);
        break;
    }

  });

  return (
    <main className='messages'>
      {htmlMessages}
    </main>
  );
}
export default MessageList;