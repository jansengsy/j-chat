import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

// Creating the socket for the client
const socket = io(URL);

export const joinRoom = (roomID) => {
  socket.emit('join-room', roomID);
}

export const chatToRoom = (data) => {
  socket.emit('chat-to-room', data);
}

export default socket;