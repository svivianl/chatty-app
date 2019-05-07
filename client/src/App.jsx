import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import Main from './Main.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      currentUser: {name: "Bob"}
    };
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(message){
    const messages = [...this.state.messages, message];
    this.setState({ messages });
  }

  // in App.jsx
  componentDidMount() {
    setTimeout(() => {

      const messages = [
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
      ];
      this.setState({ messages, loading: false })
    }, 3000);
  }


  render() {
    let  main = null;

    if(!this.state.loading) main = <Main messages={this.state.messages}/>;

    return (
      <div>
        <NavBar/>
        {main}
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
