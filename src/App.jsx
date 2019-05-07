import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import Main from './Main.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 'M0000000000001',
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 'M0000000000002',
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(message){
    const messages = [...this.state.messages, message];
    this.setState({ messages });
  }

  // in App.jsx
  componentDidMount() {
    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }


  render() {
    return (
      <div>
        <NavBar/>
        <Main messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
