import { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "../../context/chatContext";

import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CreateChatPopout({togglePopout}) {

  const { token, user } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);

  const inputRef = useRef(null);

  const [chatType, setChatType] = useState('private');
  const [stage, setStage] = useState(1);
  const [chatName, setChatName] = useState('');
  const [chatNameError, setChatNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emails, setEmails] = useState([]);
  const [ids, setIDs] = useState([]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const changeStage = (direction) => {
    if (direction === 'forward') {
      setStage(stage + 1);
    } else if (direction === 'back') {
      setStage(stage - 1);
    }
  }

  const addEmail = async (newEmail) => {
    const regex = /^(?!\s*$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/g

    if (regex.test(newEmail)) {
      try {
        const res = await axios.post('https://vast-badlands-58061-2679a94a959f.herokuapp.com/getUserID', {email: newEmail}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        setEmails([...emails, res.data.email]);
        setIDs([...ids, res.data.id]);
        setEmail('');
      } catch (err) {
        setEmail('');
        document.getElementById('email-input').classList.add('popout-error');
        setEmailError(err.response.data);
      }
    } else {
      setEmail('');
      setEmailError('Invalid email');
      document.getElementById('email-input').classList.add('popout-error');
    }
  }

  const createChat = async () => {
    try {
      const res = await axios.post('https://vast-badlands-58061-2679a94a959f.herokuapp.com/createChat', {chatName, type: 'private', admin: user._id, ids}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      setChats([...chats, res.data]);
      togglePopout();
    } catch (err) {
      console.log(err);
    }
  }

  const clearPlaceholder = () => {
    setEmailError('');
    document.getElementById('email-input').classList.remove('popout-error');
  }

  return (
    <div>
      <div className="popout-container">
        <div className="popout-header">
          <button disabled={stage === 1} onClick={() => changeStage('back')} className="popout-button">Prev</button>
          <span>Create a new chat</span>
          <button onClick={ stage === 2 ? createChat : () => changeStage('forward') } className="popout-button">
            { stage === 2 ? 'Create' : 'Next' }
          </button>
        </div>
        <div className="popout-content">
          { stage === 1 &&
            <>
              <div className="stage-content">
                <input
                  id='email-input'
                  ref={inputRef}
                  className='popout-input'
                  type='email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={clearPlaceholder}
                  placeholder={ emailError ? emailError : 'User email or username'}
                />
                <FontAwesomeIcon className='popout-icon' icon={'fa-solid fa-plus'} onClick={() => addEmail(email)}/>
              </div>
              <hr className="popout-divider"/>
              <div className='email-list'>
                <span><strong>Current emails:</strong></span>
                <ul>
                  {emails.map((email, index) => (
                    <li key={index} className="popout-list-item">{email}</li>
                  ))}
                </ul>
              </div>
            </>
          }
          { stage === 2 &&  
            <input
              ref={inputRef}
              className='popout-input'
              type='text'
              value={chatName}
              onChange={e => setChatName(e.target.value)}
              placeholder='Chat name'
            />
          }
        </div>
      </div>
    </div>
  );
};
