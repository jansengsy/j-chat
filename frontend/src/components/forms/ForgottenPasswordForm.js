import { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import FormError from './FormError';

export default function ForgottenPasswordForm() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('Request Password Reset');

  const handleForgottenPassword = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    setEmailError('');
    setUsernameError('');
    if (!validateFields()) {
      setButtonText('Request Password Reset');
      return;
    } 
    setButtonText('Sending...');
    try {
      await axios.post('https://vast-badlands-58061-2679a94a959f.herokuapp.com/email/forgottenPassword', {email, username}, {
        headers: {
            'Content-Type': 'application/json',
        },
      });
      setButtonText('Email sent!');
    } catch (err) {
      setButtonDisabled(false);
      setButtonText('Request Password Reset')
      setEmailError(err.response.data);
      setUsernameError(err.response.data);
    }
  }

  const validateFields = () => {

    let valid = true;

    if (username === '') {
      setUsernameError('Please enter a username');
      valid = false;
    }

    if (email === '') {
      setEmailError('Please enter an email');
      valid =  false;
    }

    setButtonDisabled(valid);
    return valid;
  }

  return (
    <form onSubmit={handleForgottenPassword}>
      <div className='login-box'>
        <div className='form-section'>
          <label className='form-label' htmlFor='uname'>Username</label>
          <input
            id='uname'
            type='text'
            className='form-input'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          { usernameError ? <FormError error={usernameError}/> : '' }
        </div>
        <div className='form-section'>
          <label className='form-label' htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            className='form-input'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          { emailError ? <FormError error={emailError}/> : '' }
        </div>
        <Link className='register-link' to={'/login'}>Return to login</Link>
        <div className='form-section'>
          <button disabled={buttonDisabled} className='login-button' type='submit'>{buttonText}</button>
        </div>
      </div>
    </form>
  );
}
