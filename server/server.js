const messages = [
    // {
    //   id: 'M0000000000001',
    //   type: "incomingMessage",
    //   username: "Bob",
    //   content: "Has anyone seen my marbles?",
    // },
    // {
    //   id: 'M0000000000002',
    //   type: "incomingMessage",
    //   username: "Anonymous",
    //   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    // }
  ];

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

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws, req) => {
  console.log('Client connected');
  console.log('wss.clients connect',wss.clients.size);
  wss.broadcast(JSON.stringify({ type: 'system', data: wss.clients.size }));
  // const ip = req.connection.remoteAddress;

  ws.on('open', function open() {
    ws.send(JSON.stringify({ type: 'message', data: messages }));
  });

  ws.on('message', function incoming(message) {

    const { data } = JSON.parse(message);

    switch(data.type){
      case 'postMessage':
        data.type = 'incomingMessage';
        break;
      case 'postNotification':
        data.type = 'incomingNotification';
        break;
    }

    data['id'] = uuidv1();
    messages.push(data);
    wss.broadcast(JSON.stringify({ type: 'message', data }));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    console.log('wss.clients close', wss.clients.size);
    wss.broadcast(JSON.stringify({ type: 'system', data: wss.clients.size }));
  });
});
