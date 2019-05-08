import React, {Component} from 'react';

const isImageURL = (word) => /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(word);

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
          const messages = [];

          let content = null;

          // split message into messages
          if(isImageURL(e.target.value)){

            let text = e.target.value;
            while(text){
              let begin = text.indexOf('http');
              const message = {};

              if(messages.length === 0) message['username'] = username;

              switch(begin){
                case -1:
                  message['type'] = 'postMessage';
                  message['content'] = text;
                  text = null;
                  break;
                case 0:
                  let url = text.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i);
                  message['type'] = 'postMessageImg';
                  message['content'] = url[0];
                  text = text.substr(message.content.length);
                  break;
                default:
                  message['type'] = 'postMessage';
                  message['content'] = text.substr(0, begin - 1);
                  text = text.substr(begin);
                  break;
              }

              // if(begin === 0){
              //   let url = text.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/i);
              //   message['type'] = 'postMessageImg';
              //   message['content'] = url[0];
              //   text = text.substr(message.content.length);
              // }else{
              //   message['type'] = 'postMessage';
              //   message['content'] = text.substr(0, begin - 1);
              //   text = text.substr(begin);
              // }
              messages.push(message);
            }

          }else{
            const message = {
              type: 'postMessage',
              username,
              content: e.target.value
            };
            messages.push(message);
          }

          this.props.addMessages(messages);
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
