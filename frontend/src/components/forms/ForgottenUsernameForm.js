import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import FormError from './FormError';

import '../../styles/form.css';
import '../../styles/login.css'

export default function ForgottenUsernameForm() {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formStatus, setFormStatus] = useState(false);
  const [buttonText, setButtonText] = useState('Send username reminder');

  const handleForgottenUsername = async (e) => {
    e.preventDefault();
    try {
      setEmailError('');
      setButtonText('sending...');
      setFormStatus(true);
      if(!validateFields()) return;
      await axios.post('http://localhost:3000/email/forgottenUsername', {email}, {
        headers: {
            'Content-Type': 'application/json',
        },
      });
      setButtonText('Email sent!');
    } catch (err) {
      formStatus(true);
      setButtonText('Send username reminder')
      setEmailError(err.response.data);
    }
  }

  const validateFields = async () => {
    if (email === '') {
      setEmailError('Please enter your email address');
      formStatus(true);
      setButtonText('Send username reminder');
      return false;
    }

    return true;
  }

  return (
    <>
      <form className='container' onSubmit={handleForgottenUsername}>
        <div className='login-box'>
          <div className='form-section'>
            <label className='form-label' htmlFor='email'>Email:</label>
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
            <button disabled={formStatus} className='login-button'>{buttonText}</button>
          </div>
        </div>
      </form>
    </>
  );
}
