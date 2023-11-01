import { useState, useContext, useEffect, useRef } from 'react';
import { chatToChat } from '../../socket';
import { AuthContext } from '../../context/authContext';

export default function MessageBar({chat}) {

  const messageRef = useRef(null);

  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.focus();
    }
    setInputValue('');
  }, [chat]);

  // 13 = enter key
  const enter = (e) => { if(e.which === 13) handleSendMessage() };

  const handleSendMessage = () => {
    setError('');
    if (inputValue === '') {
      setError('Messages can\'t be empty!');
      document.getElementById('message-input').classList.add('shake');
      setTimeout(() => {
        document.getElementById('message-input').classList.remove('shake');
      }, 400);
      return;
    }
    chatToChat({ chat, message: inputValue, user_id: user._id });
    setInputValue('');
  };

  document.onkeyup = enter;

  return (
    <div className='message-bar'>
      <input
        id='message-input'
        ref={messageRef}
        className='message-input'
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setError('')}
        placeholder={error}
      />
      <button
        className='message-button'
        onClick={handleSendMessage}
      >
        Send Message
      </button>
    </div>
  );
}
