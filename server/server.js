require('dotenv').config();
require('./config/database').connect();

const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const User = require('./model/user');

// Middleware
const auth = require('./middleware/auth');

// Environment variables
const { PORT, TOKEN_KEY } = process.env;

// Setup http server and then socket io server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001'
  }
});

app.use(cors());
app.use(express.json());

// Register
app.post('/register', async (req, res) => {
  
  try {
    const { first_name, last_name, username, email, password } = req.body;
    
    if (!(email && password && username && first_name && last_name)) {
      res.status(400).send('All input is required');
      console.error('ERROR: All input is required');
      return;
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({
        first_name,
        last_name,
        username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign(
        { 
          user_id: user._id, 
          username: user.username, 
          email: user.email 
        },
        TOKEN_KEY,
        {
          expiresIn: '2h',
        }
      );
  
      user.token = token;
      res.status(201).json(user);
    } catch (error) {

      if (error.message.includes('username_1')) {
        return res.status(409).send('Username already exists.');
      } else if (error.message.includes('email_1')) {
        return res.status(409).send('Email already exists.');
      }

      res.status(500).send('Server error.');
    }
  } catch (err) {
    console.log(err);
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!((email || username) && password)) {
      res.status(400).send("All input is required");
    }

    let user;

    if (email) {
      user = await User.findOne({ email });
    } else if (username) {
      user = await User.findOne({ username });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { 
          user_id: user._id, 
          email 
        },
        TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      return res.status(200).json(user);
    }

    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.get('/welcome', auth, (req, res) => {
  res.send(`Welcome, ${req.user.username}`);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat-to-room', (data) => {
    io.to(data.room).emit('chat', data.message);
  });

  socket.on('join-room', (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
 });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server started. Listening on port ${PORT}`);
});
