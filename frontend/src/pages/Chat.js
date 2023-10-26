import { useState, useEffect, useContext } from "react";
import socket, { chatToRoom } from "../socket";
import { RoomContext } from "../context/roomContext";

export default function Chat() {

  const { room } = useContext(RoomContext);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    socket.on('chat', (message) => {
      setMessages(prevMessages => [...prevMessages, message]); // Update the messages state with the new message
    });
  }, []);

  const handleSendMessage = () => {
    chatToRoom({ room: room, message: inputValue }); // Assuming this is how you send a message via socket.io
    setInputValue('');
  };

  return (
    <div className="page-container">
      <h1>Welcome to the chat!</h1>
      { room ? <div>
        <div className='message-container'>
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
              ))}
          </ul>
        </div>
        <div className="message-bar">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
          <button onClick={handleSendMessage}>Send Message</button>
        </div>
      </div> : <h1>You are not in a room yet! Click a room on the side to join :/)</h1>}
      
    </div>
  );
}