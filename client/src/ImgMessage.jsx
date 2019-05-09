import React, {Component} from 'react';
import { getStyle } from '../helpers/index.js';

const MessageImg = ({ users, message }) => {
  const style = getStyle( users, message );
  if(style){

    return (
      <div className="message">
        <span className="message-username" style={style}>{message.username}</span>
        <div className="message-img">
          <img className="message-content" src={message.content}/>
        </div>
      </div>
    );
  }else{
    return (
      <div className="message">
        <div className="message-img">
          <img className="message-content" src={message.content}/>
        </div>
      </div>
    );
  }
};

class ImgMessage extends Component {
  render() {
    return (
      <MessageImg users={this.props.users} message={this.props.message}/>
    );
  }
}
export default ImgMessage;