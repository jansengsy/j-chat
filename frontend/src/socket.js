import { io } from 'socket.io-client';

// 'undefined' means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

// Creating the socket for the client
const socket = io(URL);

export const joinChat = (chatID) => {
  socket.emit('join-chat', chatID);
}

export const chatToChat = (data) => {
  socket.emit('chat-to-chat', data);
}

export default socket;