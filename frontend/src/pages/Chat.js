import { useState, useEffect, useContext } from 'react';
import socket from '../socket';
import { ChatContext } from '../context/chatContext';

import MessageContainer from '../components/chat/MessageContainer';
import MessageBar from '../components/chat/MessageBar';
import NoChatSelected from '../components/chat/NoChatSelected';

import '../styles/chat.css';

export default function Chat() {

  const { currentChat } = useContext(ChatContext);
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
    <div className='page-container'>
      { currentChat ?
          <div className='chat'>
            <MessageContainer messages={messages} />
            <MessageBar chat={currentChat._id}/>
          </div>
          : <NoChatSelected />
      }
    </div>
  );
}