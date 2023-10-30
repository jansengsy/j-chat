import { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import '../../styles/login.css';
import '../../styles/form.css';

import FormError from './FormError';

export default function LoginForm() {

  const location = useLocation();
  const { state } = location;

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
      const redirectPath = state && state.from ? state.from : '/';
      const queryParameters = state && state.params ? contructQueryParams(state.params) : '';
      window.location.replace(window.location.origin + redirectPath + queryParameters);
    } catch (err) {
      handleErrors(err);
    }
  }

  const contructQueryParams = (paramsObject) => {
    const queryString = Object.keys(paramsObject)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`)
      .join('&');

    return `?${queryString}`;
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
              id='uname'
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
              id='password'
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
          <Link className='register-link' to={'/register'}>Don't have an account? Register here</Link>
          <div className='form-section'>
            <button type='submit' className='login-button'>Login</button>
          </div>
          <div className='forgotten-section'>
            <Link className='register-link' to={'/forgotten-username'}>Forgotten username?</Link>
            <hr className='forgotten-divider'/>
            <Link className='register-link' to={'/forgotten-password'}>Forgotten password?</Link>
          </div>
        </div>
      </form>
    </>
  );
}
