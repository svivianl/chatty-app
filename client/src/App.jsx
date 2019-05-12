import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super();

    this.state = {
      currentUser: {name:'Anonymous'},
      messages: [],
      users: [],
      numberOfUsers: 0
    };

    this.addMessages = this.addMessages.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  addMessages(messages){
    const messageStr = JSON.stringify({
      data: {
        type: 'postMessage',
        messages
      }
    });
    this.socket.send(messageStr);
  }

  changeUser(user){
    let name = '';
    if(this.state.currentUser.name.length) {
      name = this.state.currentUser.name[this.state.currentUser.name.length - 1];
    }

    const data = {
      type: 'postNotification',
      content: `${name} has changed their name to ${user.name}`,
      currentUser: user
    }

    this.setState({ currentUser: user });
    const messageStr = JSON.stringify({ data });
    this.socket.send(messageStr);
  }

  // in App.jsx
  componentDidMount() {
    //create a new socket connection
    this.socket = new WebSocket('ws://localhost:3001/');

    this.socket.onopen = (e) => {
      console.log('connection to server open');
    };

    this.socket.onmessage = e => {

      const { type, data } = JSON.parse(e.data);

      switch(type){
        case 'init':
          const currentUser = {
            id: data.currentUser.id,
            name: data.currentUser.name
          }

          let loading = true;
          if(data.messages.length) loading = false;

          this.setState({
            currentUser: currentUser,
            users: data.users,
            numberOfUsers: data.numberOfUsers,
            messages: [...this.state.messages, ...data.messages],
            loading
          });
          break;

        case 'changeUser':
          this.setState({ currentUser: data.currentUser });
          break;

        case 'addUser':
          this.setState({
            users: [...this.state.users, data.user],
            numberOfUsers: data.numberOfUsers
          });
          break;

        case 'message':
          let newMessages = [...this.state.messages, ...data];
          this.setState( { messages: newMessages, loading: false });
          break;

        case 'notification':
          this.setState({
            users: [...data.users],
            messages: [...this.state.messages, data.message],
          });
          break;

        case 'clientsSize':
          this.setState({ numberOfUsers: data.numberOfUsers });
          break;

        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + type);
      }
    };

    this.socket.onclose = () => {
      console.log('close');
    };
  }


  render() {
    let  main = null;

    if(this.state.messages.length) main = <MessageList users={this.state.users} messages={this.state.messages}/>;

    return (
      <div>
        <NavBar numberOfUsers={this.state.numberOfUsers}/>
        {main}
        <ChatBar currentUser={this.state.currentUser}
                 addMessages={this.addMessages}
                 changeUser={this.changeUser}
        />
      </div>
    );
  }
}
export default App;
