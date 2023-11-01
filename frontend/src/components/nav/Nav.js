import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/chatContext';
import { joinChat } from '../../socket';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../styles/nav.css'

export default function Nav() {

  const { token, user, deleteToken, deleteUser } = useContext(AuthContext);
  const { currentChat, setCurrentChat, chats, setChats } = useContext(ChatContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getChats() {
      try {
        const res = await axios.get('http://localhost:3000/getChats', {id: user._id}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        setChats(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err)
      }
    }

    getChats();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    deleteUser('user');
    deleteToken('token');
  }

  const handleJoinChat = (chat) => {
    joinChat(chat._id);
    setCurrentChat(chat);
  }

  const handleDeleteChat = async (chatToDelete) => {

    const newChats = chats.filter((chat) => chat._id != chatToDelete);
    setChats(newChats);

    try {
      await axios.post('http://localhost:3000/deleteChat', {_id: chatToDelete}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      
      if (currentChat._id === chatToDelete) {
        setCurrentChat(null);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className='sidenav'>
        <div className='nav-menu'>
          <ul>
            {loading === false && chats.map((chat) => (
              <li
                key={chat._id}
                className={`nav-item ${ currentChat === chat._id ? 'selected-nav-item' : ''}`}
                onClick={() => handleJoinChat(chat)}
              >
                {chat.name}
                <FontAwesomeIcon icon={'fa-solid fa-trash'} onClick={() => handleDeleteChat(chat._id)}/>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleLogout} className='logout-button'>Logout</button>
      </div>
    </>
  );
}
