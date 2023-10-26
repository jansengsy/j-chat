import { useState, useEffect, useContext } from "react";
import socket from "../socket";
import { RoomContext } from "../context/roomContext";

import MessageContainer from "../components/chat/MessageContainer";
import MessageBar from "../components/chat/MessageBar";

import "../styles/chat.css";

export default function Chat() {

  const { room } = useContext(RoomContext);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });
  }, []);

  return (
    <div className="page-container">
      { room ? 
          <div className="chat">
            <MessageContainer messages={messages} />
            <MessageBar room={room}/>
          </div>
          :
          <h1 className="no-room">You are not in a room yet! Click a room on the side to join :)</h1>
      }
        
      </div>
  );
}