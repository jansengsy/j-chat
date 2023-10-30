import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NoChatSelected() {
  return (
    <div className='no-chat-container'>
      <FontAwesomeIcon className='no-chat-icon' icon={'fa-brands fa-rocketchat'}/>
      <h1 className='no-chat-header'>You are not in a chat yet</h1>
      <p className='no-chat-content'>You need to select a chat in order to send and receive messages</p>
    </div>
  );
}