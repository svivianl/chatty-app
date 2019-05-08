import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const htmlMessages = this.props.messages.map(message => <Message key={message.id} users={this.props.users} message={message}/>);

    return (
      <main className="messages">
        {htmlMessages}
      </main>
    );
  }
}
export default MessageList;