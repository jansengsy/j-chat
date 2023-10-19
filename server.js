require('dotenv').config();

const path = require('path');
const http = require('http');

const express = require('express');
const socketio = require('socket.io');

const port = process.env.PORT;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}`);
});
