import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    const htmlMessages = this.props.messages.map(message => <Message message={message}/>);

    return (
      <main className="messages">
        {htmlMessages}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
    );
  }
}
export default MessageList;