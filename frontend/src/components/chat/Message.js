import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

export default function Message({message}) {

  const {user} = useContext(AuthContext);

  const username = (message.user_id && message.user_id.username) || 'unknown';
  const messageid = (message.user_id && message.user_id._id) || undefined;

  return (
    <div className={`message ${user._id === messageid ? 'my-message' : 'other-message'}`}>
      <span className='message-user'><strong>{username}:</strong></span>
      <div className='message-content'>
        <span>{message.content}</span>
      </div>
      <span className='message-timestamp'>{new Date(message.timestamp).toLocaleString([], {hour: '2-digit', minute:'2-digit', hour12: false})}</span>
    </div>
  );
}
