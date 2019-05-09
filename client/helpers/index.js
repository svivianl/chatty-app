"use strict";

module.exports = {

  getStyle: ( users, message ) => {
    if(message.hasOwnProperty('username')){
      const user = users.filter(user => (user.name.includes(message.username) ) ? true : false );
      return { color: user[0].color };
    }
    return null;
  }
}
