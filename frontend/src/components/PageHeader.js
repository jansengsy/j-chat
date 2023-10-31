import { useContext } from 'react';
import { ChatContext } from '../context/chatContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PageHeader() {

  const { chat } = useContext(ChatContext);

  return (
    <div className='page-header'>
      <div className='nav-header'>
        <h1 className='header-title'>Chats</h1>
        <button className='header-button new-chat'><FontAwesomeIcon icon={'fa-solid fa-square-plus'}/></button>
        <button className='header-button unread-chats'><FontAwesomeIcon icon={'fa-solid fa-filter'}/></button>
      </div>
      <div className='content-header'>
        <h1 className='header-title'>{chat}</h1>
      </div>
    </div>
  );
}
