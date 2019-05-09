import React, {Component} from 'react';
import { getStyle } from '../helpers/index.js';

class ImgMessage extends Component {
  render() {
    const style = getStyle( this.props.users, this.props.message );
    const addUsername = style && (
      <span className="message-username" style={style}>{this.props.message.username}</span>);

    return (
      <div className="message">
        {addUsername}
        <img className="message-content" src={this.props.message.content}/>
      </div>
    );
  }
}
export default ImgMessage;