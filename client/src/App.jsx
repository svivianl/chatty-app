import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import Main from './Main.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loading: true,
      currentUser: {name: "Bob"},
      messages: []
    };

    //create a new socket connection
    const socket = new WebSocket('ws://localhost:3001/');

    socket.onopen = () => {
      console.log('connection to server open');
    };

    socket.onmessage = e => {
      var message = JSON.parse(e.data);
      let newMessages = [];

      switch(message.type){
        case 'singleMessage':
          newMessages = [...this.state.messages, message.data];
          break;
        case 'multiMessages':
          newMessages = [...this.state.messages, ...message.data];
          break;
      }

      this.setState( { messages: newMessages, loading: false });
    };

    socket.onclose = () => {
      console.log('close');
    };

    this.socket = socket;

    this.addMessage = this.addMessage.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  addMessage(message){
    const messageStr = JSON.stringify(message);
    this.socket.send(messageStr);
  }

  changeUser(user){
    this.setState({ currentUser: user });
  }

  // in App.jsx
  componentDidMount() {

    // setTimeout(() => {

    //   const messages = [
    //     {
    //       id: 'M0000000000001',
    //       username: "Bob",
    //       content: "Has anyone seen my marbles?",
    //     },
    //     {
    //       id: 'M0000000000002',
    //       username: "Anonymous",
    //       content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    //     }
    //   ];
    //   this.setState({ messages, loading: false })
    // }, 3000);
  }


  render() {
    let  main = null;

    if(!this.state.loading) main = <Main messages={this.state.messages}/>;

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
