import { useState, useContext, useReducer } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/authContext';
import RegisterFormReducer from '../../reducers/RegisterFormReducer';

import '../../styles/login.css';
import '../../styles/form.css';

import FormError from './FormError';

export default function RegistrationForm() {

  const initialState = {
    usernameError: '',
    emailError: '',
    confirmEmailError: '',
    passwordError: '',
    confirmPasswordError: '',
  }

  const { register, saveToken } = useContext(AuthContext);
  const [state, dispatch] = useReducer(RegisterFormReducer, initialState);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    confirm_email: '',
    password: '',
    confirm_password: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      clearErrors();
      await validate();
      const token = await register(formData);
      saveToken(token.token);
      window.location.replace(window.location.origin + '/');
    } catch (err) {
      handleErrors(err);
    }
  }

  const setError = (field, value) => {
    dispatch({ type: 'SET_ERROR', field, value });
  }

  const validate = () => {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*\s)[A-Za-z\d@$!%*?&]{6,}$/;
    let validationSucceeds = true;

    return new Promise((resolve, reject) => {
      if (!formData.username) {
        validationSucceeds = false;
        setError('username', 'Please enter a username.');
      }

      if (!formData.email) {
        validationSucceeds = false;
        setError('email', 'Please enter an email.');
      }

      if (!formData.confirm_email) {
        validationSucceeds = false;
        setError('confirmEmail', 'Please confirm your email.');
      }

      if (!formData.password) {
        validationSucceeds = false;
        setError('password', 'Please enter a password.');
      }

      if (!formData.confirm_password) {
        validationSucceeds = false;
        setError('confirmPassword', 'Please confirm your password.');
      }

      if (formData.email !== formData.confirm_email) {
        validationSucceeds = false;
        setError('confirmEmail', 'Emails must match.');
      }

      if (formData.password !== formData.confirm_password) {
        validationSucceeds = false;
        setError('confirmPassword', 'Passwords must match.');
      }

      if (!passwordRegex.test(formData.password)) {
        validationSucceeds = false;
        setError('password', 'Invalid password. Password must contain upper and lower case characters, numbers, and special characters.');
      }

      if (validationSucceeds) {
        resolve();
      } else {
        reject({
          response: {
            data: 'Validation failed'
          }
        });
      }
    });
  }

  const clearErrors = () => {
    dispatch({ type: 'RESET', value: initialState });
  }

  const handleErrors = (error) => {

    const errorMsg = error.response.data;

    if (errorMsg === 'Email already exists.') {
      setError('email', errorMsg);
    }

    if (errorMsg === 'Username already exists.') {
      setError('username', errorMsg);
    }
  }

  return (
    <>
      <form className='container' onSubmit={handleRegister}>
        <div className='login-box'>
          <div className='form-section'>
            <label htmlFor='uname' className='form-label'>Username:</label>
            <input
              id='uname'
              className={`form-input ${state.usernameError ? 'form-input-error' : ''}`}
              type='text'
              value={formData.username}
              onChange={e => setFormData(prevData => ({
                ...prevData,
                username: e.target.value,
              }))}
            />
            {state.usernameError && <FormError error={state.usernameError} />}
          </div>
          <div className='form-section'>
            <label htmlFor='email' className='form-label'>Email:</label>
            <input
              id='email'
              className={`form-input ${state.emailError ? 'form-input-error' : ''}`}
              type='email'
              value={formData.email}
              onChange={e => setFormData(prevData => ({
                ...prevData,
                email: e.target.value,
              }))}
            />
            {state.emailError && <FormError error={state.emailError} />}
          </div>
          <div className='form-section'>
            <label htmlFor='cemail' className='form-label'>Confirm Email:</label>
            <input
              id='cemail'
              className={`form-input ${state.confirmEmailError ? 'form-input-error' : ''}`}
              type='email'
              value={formData.confirm_email}
              onChange={e => setFormData(prevData => ({
                ...prevData,
                confirm_email: e.target.value,
              }))}
            />
            {state.confirmEmailError && <FormError error={state.confirmEmailError} />}
          </div>
          <div className='form-section'>
            <label htmlFor='password' className='form-label'>Password:</label>
            <input
              id='password'
              className={`form-input ${state.passwordError ? 'form-input-error' : ''}`}
              type='password'
              value={formData.password}
              onChange={e => setFormData(prevData => ({
                ...prevData,
                password: e.target.value,
              }))}
            />
            {state.passwordError && <FormError error={state.passwordError} />}
          </div>
          <div className='form-section'>
            <label htmlFor='cpassword' className='form-label'>Confirm password:</label>
            <input
              id='cpassword'
              className={`form-input ${state.confirmPasswordError ? 'form-input-error' : ''}`}
              type='password'
              value={formData.confirm_password}
              onChange={e => setFormData(prevData => ({
                ...prevData,
                confirm_password: e.target.value,
              }))}
            />
            {state.confirmPasswordError && <FormError error={state.confirmPasswordError} />}
          </div>
          <Link className='register-link' to={'/login'}>Already have an account? Login here</Link>
          <div className='form-section'>
            <button type='submit' className='login-button'>Register</button>
          </div>
        </div>
      </form>
    </>
  );
}
