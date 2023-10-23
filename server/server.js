require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const path = require('path');
const http = require('http');

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001"
  }
});

// I can use this to serve a directory to the browser. 
// app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // socket.onAny((eventName, ...args) => {
  //   console.log(`Catch all event name: ${eventName}`);
  //   console.log(`Catch all event arguments: ${args}`);
  // });
});

server.listen(port, () => {
  console.log(`Server started. Listening on port ${port}`);
});
