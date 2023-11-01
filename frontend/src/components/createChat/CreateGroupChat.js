import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/authContext";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CreateGroupChat({stage, chatData, setChatData}) {

  const inputRef = useRef(null);

  const {token} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addEmail = async (newEmail) => {
    const regex = /^(?!\s*$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/g

    if (regex.test(newEmail)) {
      try {
        const res = await axios.post('http://localhost:3000/getUserID', {email: newEmail}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        setEmails([...emails, res.data.email]);
        setChatData(prevData => ({
          ...prevData,
          ids: [...chatData.ids, res.data.id],
        }));
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

  const clearPlaceholder = (id) => {
    setEmailError('');
    document.getElementById(id).classList.remove('popout-error');
  }

  return (
    <div className="popout-content">
      { stage === 0 &&
        <>
          <div className="stage-content">
            <input
              id='email-input'
              ref={inputRef}
              className='popout-input'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => clearPlaceholder('email-input')}
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
      { stage === 1 &&
        <div>
          <input
            ref={inputRef}
            id='name-input'
            className='popout-input'
            type='text'
            value={chatData.chatName}
            onChange={e => setChatData(prevData => ({
              ...prevData,
              chatName: e.target.value,
            }))}
          />
        </div>
      }
    </div>
  )
}