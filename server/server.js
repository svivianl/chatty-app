//====================================================================
// requires
//====================================================================
const express       = require('express');
const WebSocket     = require('ws');
const SocketServer  = WebSocket.Server;
const uuidv1        = require('uuid/v1');

// Set the port to 3001
const PORT          = process.env.PORT || 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

//====================================================================
// DB
//====================================================================
const { messages, users } = require( './model/index.js' );

//====================================================================
// Variables
//====================================================================

// Array with some colors
var colors = [ 'red', 'green', 'blue', 'magenta' ];
// ... in random order
colors.sort((a,b) => Math.random() > 0.5 );

// Create the WebSockets server
const wss = new SocketServer({ server });
//====================================================================
// Functions
//====================================================================

// Broadcast to all.
wss.broadcast = function broadcast(message) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws, req) => {
  console.log('Client connected');

  const user = {
    id: uuidv1(),
    name: [`Anonymous`],
    color: colors[wss.clients.size - 1]
  };

  users.push(user);

  ws.send(JSON.stringify({
    type: 'init',
    data: {
      numberOfUsers: wss.clients.size,
      currentUser: user,
      users,
      messages
    }
  }));

  wss.broadcast(JSON.stringify({
    type: 'addUser',
    data: {
      numberOfUsers: wss.clients.size,
      user
    }
  }));

  ws.on('message', function incoming(incomingMessage) {

    const { type, data } = JSON.parse(incomingMessage);

    switch(type){
      case 'postMessage':
        const newMessages = [];
        data.messages.forEach(currentMessage => {
          currentMessage['id'] = uuidv1();
          switch(currentMessage.type){
            case 'postMessage':
              currentMessage.type = 'incomingMessage';
              break;
            case 'postMessageImg':
              currentMessage.type = 'incomingMessageImg';
              break;
          }
          messages.push(currentMessage);
          newMessages.push(currentMessage);
        });
        wss.broadcast(JSON.stringify({ type: 'message', data: newMessages }));
        break;

      case 'postNotification':
        const message = {
          type: 'incomingNotification',
          id: uuidv1(),
          content: data.content
        };
        messages.push(message);

        user.name.push(data.currentUser.name);
        wss.broadcast(JSON.stringify({ type: 'notification', data: {message, users} }));

        ws.send(JSON.stringify({
          type: 'changeUser',
          data: { currentUser: user }
        }));
        break;
    }

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    const data = {
      numberOfUsers:  wss.clients.size
    }
    wss.broadcast(JSON.stringify({ type: 'clientsSize', data }));

    // clear global variables
    if(wss.clients.size === 0){
      messages.length = 0;
      users.length = 0;
    }
  });
});
