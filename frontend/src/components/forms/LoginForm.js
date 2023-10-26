import { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';

import '../../styles/login.css';
import '../../styles/form.css';

import FormError from './FormError';

export default function LoginForm() {

  const { login, saveToken } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError(false);
      const token = await login(formData);
      saveToken(token.token);
      window.location.replace(window.location.origin + '/');
    } catch (err) {
      handleErrors(err);
    }
  }

  const handleErrors = (error) => {
    setError(true);
    setErrorMessage(error.response.data)
  }

  return (
    <>
      <form className='container' onSubmit={handleLogin}>
        <div className='login-box'>
          <div className='form-section'>
            <label htmlFor='uname' className='form-label'>Username:</label>
            <input
              name='uname'
              className='form-input'
              type='text'
              value={formData.username}
              onChange={e => setFormData(prevData => ({
                ...prevData,
                username: e.target.value,
              }))}
            />
            { error && <FormError error={errorMessage}/> }
          </div>
          <div className='form-section'>
            <label htmlFor='password' className='form-label'>Password:</label>
            <input
              name='password'
              className='form-input'
              type='password'
              value={formData.password}
              onChange={e => setFormData(prevData => ({
                ...prevData,
                password: e.target.value,
              }))}
            />
            { error && <FormError error={errorMessage}/> }
          </div>
          <div className='form-section'>
            <button type='submit' className='login-button'>Login!</button>
          </div>
        </div>
      </form>
    </>
  );
}