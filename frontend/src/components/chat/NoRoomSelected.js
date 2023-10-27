import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NoRoomSelected() {
  return (
    <div className='no-room-container'>
      <FontAwesomeIcon className='no-room-icon' icon={'fa-brands fa-rocketchat'}/>
      <h1 className='no-room-header'>You are not in a chat yet</h1>
      <p className='no-room-content'>You need to select a chat in order to send and receive messages</p>
    </div>
  );
}