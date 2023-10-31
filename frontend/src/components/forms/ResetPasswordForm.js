import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import FormError from './FormError';

export default function ResetPasswordForm() {

  // eslint-disable-next-line no-unused-vars
  const [searchParams, nosetSearchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [cpasswordError, setCPasswordError] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonText, setButtonText] = useState('Reset Password');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    setPasswordError('');
    setCPasswordError('');
    if (!validateFields()) {
      setButtonText('Reset Password');
      return;
    } 
    setButtonText('Sending...');
    try {
      await axios.post('http://localhost:3000/resetPassword', {email: searchParams.get('email'), password, cpassword}, {
        headers: {
            'Content-Type': 'application/json',
        },
      });
      setButtonText('Password Reset!');
    } catch (err) {
      setButtonDisabled(false);
      setButtonText('Reset Password')
      setPasswordError(err.response.data);
      setCPasswordError(err.response.data);
    }
  }

  const validateFields = () => {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*\s)[A-Za-z\d@$!%*?&]{6,}$/;
    let valid = true;

    if (password === '') {
      setPasswordError('Please enter a password');
      valid = false;
    }

    if (cpassword === '') {
      setCPasswordError('Please confirm your password');
      valid =  false;
    }

    if (password !== cpassword) {
      valid = false;
      setPasswordError('Passwords must match');
      setCPasswordError('Passwords must match');
    }

    if (!passwordRegex.test(password)) {
      valid = false;
      setPasswordError('Invalid password. Password must contain upper and lower case characters, numbers, and special characters.');
    }

    setButtonDisabled(valid);
    return valid;
  }

  return (
    <form onSubmit={handleResetPassword}>
      <div className='login-box'>
        <div className='form-section'>
          <label className='form-label' htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            className='form-input'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          { passwordError ? <FormError error={passwordError}/> : '' }
        </div>
        <div className='form-section'>
          <label className='form-label' htmlFor='cpassword'>Confrim Password</label>
          <input
            id='cpassword'
            type='password'
            className='form-input'
            value={cpassword}
            onChange={e => setCPassword(e.target.value)}
          />
          { cpasswordError ? <FormError error={cpasswordError}/> : '' }
        </div>
        <Link className='register-link' to={'/login'}>Return to login</Link>
        <div className='form-section'>
          <button disabled={buttonDisabled} className='login-button' type='submit'>{buttonText}</button>
        </div>
      </div>
    </form>
  );
}
