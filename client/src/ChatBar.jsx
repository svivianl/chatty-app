import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(e){
    if(e.charCode === 13){
      switch(e.target.name){
        case 'username':
          const user ={
            id: this.props.currentUser.id,
            name:  e.target.value
          };
          this.props.changeUser(user);
          break;

        case 'message':
          const username = this.props.currentUser.name[this.props.currentUser.name.length - 1];
          const message = {
            username,
            content: e.target.value
          };
          this.props.addMessage(message);
          e.target.value = '';
          break;
      }
    }
  }

  render() {
    let username = this.props.currentUser.name;
    if(this.props.currentUser.name !== undefined && Array.isArray(this.props.currentUser.name) && this.props.currentUser.name.length > 0) username = this.props.currentUser.name[this.props.currentUser.name.length - 1];
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
                placeholder="Your Name (Optional)"
                defaultValue={username}
                name='username'
                onKeyPress={this.onKeyPress}
        />
        <input className="chatbar-message"
                placeholder="Type a message and hit ENTER"
                name='message'
                onKeyPress={this.onKeyPress}
        />
      </footer>
    );
  }
}
export default ChatBar;
