import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      currentUser: {name: ''},
      messages: []
    };

    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  addMessage(message){
    message['type'] = 'postMessage';
    const messageStr = JSON.stringify({ data: message });
    this.socket.send(messageStr);
  }

  changeUser(user){
    const message = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} has changed their name to ${user.name}`
    }

    this.setState({ currentUser: user });
    const messageStr = JSON.stringify({ data: message });
    this.socket.send(messageStr);
  }

  // in App.jsx
  componentDidMount() {
    //create a new socket connection
    this.socket = new WebSocket('ws://localhost:3001/');

    this.socket.onopen = () => {
      console.log('connection to server open');
    };

    this.socket.onmessage = e => {
      const { data } = JSON.parse(e.data);
      let newMessages = [];
      Array.isArray(data) ? newMessages = [...this.state.messages, ...data] : newMessages = [...this.state.messages, data];
      this.setState( { messages: newMessages, loading: false });
    };

    this.socket.onclose = () => {
      console.log('close');
    };
  }


  render() {
    let  main = null;

    if(!this.state.loading) main = <MessageList messages={this.state.messages}/>;

    return (
      <div>
        <NavBar/>
        {main}
        <ChatBar currentUser={this.state.currentUser}
                 addMessage={this.addMessage}
                 changeUser={this.changeUser}
        />
      </div>
    );
  }
}
export default App;
