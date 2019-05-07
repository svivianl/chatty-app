import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(e){
      // debugger;
    if(e.charCode === 13){
      switch(e.target.name){
        // case 'username':
        //   break;
        case 'message':

          const message = {
            username: this.props.currentUser.name,
            content: e.target.value
          };
          this.props.addMessage(message);
          e.target.value = '';
          break;
      }
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} name='username'/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" name='message' onKeyPress={this.onKeyPress}/>
      </footer>
    );
  }
}
export default ChatBar;