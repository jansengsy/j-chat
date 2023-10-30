import { useState, useEffect, useContext } from "react";
import socket from "../socket";
import { RoomContext } from "../context/roomContext";

import MessageContainer from "../components/chat/MessageContainer";
import MessageBar from "../components/chat/MessageBar";
import NoRoomSelected from "../components/chat/NoRoomSelected";

import "../styles/chat.css";

export default function Chat() {

  const { room } = useContext(RoomContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('old-messages', (messages) => {
      setMessages(messages);
    });
    socket.on('new-message', (message) => {
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
          : <NoRoomSelected />
      }
    </div>
  );
}