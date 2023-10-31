import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { ChatContext } from '../../context/chatContext';
import { joinChat } from '../../socket';

import '../../styles/nav.css'

export default function Nav() {

  const { deleteToken, deleteUser } = useContext(AuthContext);
  const { chat, setChat } = useContext(ChatContext);

  const handleLogout = (e) => {
    e.preventDefault();
    deleteUser('user');
    deleteToken('token');
  }

  const handleJoinChat = async (chatID) => {
    joinChat(chatID);
    setChat(chatID);
  }

  return (
    <>
      <div className='sidenav'>
        <div className='nav-menu'>
          <ul>
            <li
              className={`nav-item ${ chat === 1 ? 'selected-nav-item' : ''}`}
              onClick={() => handleJoinChat(1)}
            >
              Chat 1
            </li>
            <li
              className={`nav-item ${ chat === 2 ? 'selected-nav-item' : ''}`}
              onClick={() => handleJoinChat(2)}
            >
              Chat 2
            </li>
            <li
              className={`nav-item ${ chat === 3 ? 'selected-nav-item' : ''}`}
              onClick={() => handleJoinChat(3)}
            >
              Chat 3
            </li>
            <li
              className={`nav-item ${ chat === 4 ? 'selected-nav-item' : ''}`}
              onClick={() => handleJoinChat(4)}
            >
              Chat 4
            </li>
            <li
              className={`nav-item ${ chat === 5 ? 'selected-nav-item' : ''}`}
              onClick={() => handleJoinChat(5)}
            >
              Chat 5
            </li>
            <li
              className={`nav-item ${ chat === 6 ? 'selected-nav-item' : ''}`}
              onClick={() => handleJoinChat(6)}
            >
              Chat 6
            </li>
          </ul>
        </div>
        <button onClick={handleLogout} className='logout-button'>Logout</button>
      </div>
    </>
  );
}
