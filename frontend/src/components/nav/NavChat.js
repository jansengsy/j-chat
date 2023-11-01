import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NavChat({currentChat, chat, handleDeleteChat, handleJoinChat}) {
  
  return (
    <div
      className={`nav-item ${ currentChat?._id === chat._id ? 'selected-nav-item' : ''}`}
      onClick={() => handleJoinChat(chat)}
    >
      {chat.name}
      <FontAwesomeIcon
        className='nav-item-delete-icon'
        icon={'fa-solid fa-trash'}
        onClick={() => handleDeleteChat(chat._id)}
      />
    </div>
  )
}
