import { useState, useContext } from 'react';
import { ChatContext } from '../context/chatContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NewChatPopout from './createChat/NewChatPopout';

export default function PageHeader() {

  const { currentChat } = useContext(ChatContext);
  const [showPopout, setShowPopout] = useState(false);

  const togglePopout = () => {
    setShowPopout(!showPopout);
  };

  return (
    <div className='page-header'>
      <div className='nav-header'>
        <h1 className='header-title'>Chats</h1>
        <button className='header-button new-chat' onClick={togglePopout}><FontAwesomeIcon icon={'fa-solid fa-square-plus'}/></button>
        {showPopout && <NewChatPopout togglePopout={togglePopout}/>}
        <button className='header-button unread-chats'><FontAwesomeIcon icon={'fa-solid fa-filter'}/></button>
      </div>
      <div className='content-header'>
        <h1 className='header-title'>{currentChat ? currentChat.name : ''}</h1>
      </div>
    </div>
  );
}
