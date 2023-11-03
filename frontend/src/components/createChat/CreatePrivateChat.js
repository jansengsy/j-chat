import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/authContext";

import axios from "axios";

export default function CreatePrivateChat({createChat, setChatData}) {

  const inputRef = useRef(null);

  const {token} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addEmail = async () => {
    const regex = /^(?!\s*$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/g

    if (regex.test(email)) {
      try {
        const res = await axios.post('http://localhost:3000/getUserID', {email}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        createChat({
          chatName: `Chat with ${res.data.username}`,
          ids: [res.data.id],
        });
        setEmail('');
        clearPlaceholder('email-input')
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

  const enter = (e) => { if(e.which === 13) addEmail() };
  document.onkeyup = enter;

  return (
    <div className="popout-content">
      <div className="stage-content">
        <p>{  }</p>
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
      </div>
    </div>
  )
}
