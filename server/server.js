require('dotenv').config();
require('./config/database').connect();
const { send } = require('./config/nodemailer');

const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Models
const User = require('./models/user');
const Message = require('./models/message');
const Chat = require('./models/chat');

// Email templates
const generateRegisterEmailTemplate = require('./emailTemplates/register');
const generateReminderTemplate = require('./emailTemplates/usernameReminder');
const generatePasswordResetTemplate = require('./emailTemplates/resetPassword');

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

app.post('/getUserID', auth, async (req, res) => {

  const {_id, email, username} = req.body;

  try {
    const user = await User.findOne({
      $or: [{ _id }, { email }, { username }]
    });

    if (user === null) {
      return res.status(404).send('No user with that email exists.');
    }
    return res.status(200).json({id: user._id, email: user.email});
  } catch (err) {
    console.log(err)
    return res.status(500).send('Server error.');
  }
});

app.post('/resetPassword', async (req, res) => {
  const { email, password, cpassword } = req.body;

  if (!(email && password && cpassword)) {
    return res.status(400).send('All input is required.');
  }

  if (password !== cpassword) {
    return res.status(400).send('Passwords must match');
  }

  encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const filter = { email: email };
    const update = { password: encryptedPassword };
    let updatedUser = await User.findOneAndUpdate(filter, update, { new: true });

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('Password reset!');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Email
app.post('/email/forgottenPassword', async (req, res) => {
  const { email, username } = req.body;
  const from = 'jansen.chat.app@gmail.com';
  const to = email;
  const subject = 'Reset your J-Chat password';
  try {
    const user = await User.findOne({ email, username });
    if (user === null) {
      return res.status(500).send('There is no user associated with that email or username.');
    }
    const html = generatePasswordResetTemplate(email);
    const data = { from, to, subject, html };
    await send(data);
    return res.status(200).send('Password reset email sent.');
  } catch (err) {
    console.log(err)
    return res.status(500).send('Server error');
  }
});

app.post('/email/forgottenUsername', async (req, res) => {
  const { email } = req.body;
  const from = 'jansen.chat.app@gmail.com';
  const to = email;
  const subject = 'J-Chat username reminder';
  try {
    const user = await User.findOne({ email });
    if (user === null) {
      return res.status(500).send('User not found');
    }
    const html = generateReminderTemplate(user.username);
    const data = { from, to, subject, html };
    await send(data);
    return res.status(200).send('Username reminder email sent.');
  } catch (err) {
    return res.status(500).send('Server error');
  }
});

app.post('/email/register', async (req, res) => {

  const { verification_token, username, email } = req.body;

  const from = 'jansen.chat.app@gmail.com';
  const to = email;
  const subject = 'Welcome to J-Chat!';

  const html = generateRegisterEmailTemplate(verification_token, username, email);

  try {
    const data = { from, to, subject, html };
    await send(data);
    return res.status(200).send('Email successfully sent');
  } catch (err) {
    return res.status(500).send('Server error');
  }
});

app.post('/email/sendVerificationEmail', auth, async (req, res) => {

  const { verification_token, username, email } = req.body;

  const from = 'J-Chat';
  const to = email;
  const subject = 'Welcome to J-Chat!';

  const html = generateRegisterEmailTemplate(verification_token, username, email);

  try {
    const data = { from, to, subject, html };
    await send(data);
    return res.status(200).send('Email successfully sent');
  } catch (err) {
    return res.status(500).send('Server error');
  }

});

app.get('/email/verify', auth, async (req, res) => {
  const email = req.query.email;
  const token = req.query.token;

  try {
    const filter = { email: email, verification_token: token };
    const update = { verified: true };
    let updatedUser = await User.findOneAndUpdate(filter, update, { new: true });

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('Email verified successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Register
app.post('/register', async (req, res) => {
  
  try {
    const { username, email, password } = req.body;
    
    if (!(email && password && username)) {
      res.status(400).send('All input is required.');
      return;
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    const verification_token = crypto.randomBytes(20).toString('hex');

    try {
      const user = await User.create({
        username,
        email: email.toLowerCase(),
        password: encryptedPassword,
        verification_token: verification_token,
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
      res.status(400).send('All input is required');
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
          expiresIn: '2h',
        }
      );

      user.token = token;
      return res.status(200).json(user);
    }

    return res.status(400).send('Invalid Credentials');
  } catch (err) {
    console.log(err);
  }
});

app.get('/welcome', auth, (req, res) => {
  res.send(`Welcome, ${req.user.username}`);
});

app.get('/messages/:chat', auth, async (req, res) => {
  const chat = req.params.chat;
  const messages = await Message.find({ chat });
  res.json(messages);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat-to-chat', async(data) => {

    const { chat, message, user_id } = data;
    if (message === '') {
      return;
    }
    const newRawMessage = await Message.create({ chat, content: message, user_id });
    const newMessage = await newRawMessage.populate('user_id', 'username');

    io.to(chat).emit('new-message', newMessage);
  });

  socket.on('join-chat', async (chat) => {

    socket.join(chat);

    const oldMessages = await Message.find({ chat }).populate('user_id', 'username');

    socket.emit('old-messages', oldMessages);

 });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server started. Listening on port ${PORT}`);
});
