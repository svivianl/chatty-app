import React, {Component} from 'react';

class Notification extends Component {
  render() {
    return (
      <div className='notification-content'>{this.props.message.content}</div>
    );
  }
}
export default Notification;