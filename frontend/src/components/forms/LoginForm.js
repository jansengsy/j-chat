import { useState, useContext } from "react";
import { AuthContext } from '../../context/authContext';

import FormError from "./FormError";

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
      saveToken(token);
      window.locatiom.replace(window.location.origin + '/');
    } catch (err) {
      handleErrors(err);
    }
  }

  const handleErrors = (error) => {
    setError(true);
    setErrorMessage(error.response.data)
    console.log(error.response);
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor='uname'>Username:</label>
        <input
          name='uname'
          type='text'
          value={formData.username}
          onChange={e => setFormData(prevData => ({
            ...prevData,
            username: e.target.value,
          }))}
          placeholder='Enter your username...'
        />
        { error && <FormError error={errorMessage}/> }
        <label htmlFor='password'>Password:</label>
        <input
          name='password'
          type='password'
          value={formData.password}
          onChange={e => setFormData(prevData => ({
            ...prevData,
            password: e.target.value,
          }))}
          placeholder='Enter your password...'
        />
        { error && <FormError error={errorMessage}/> }
        <button type='submit'>Login!</button>
      </form>
    </div>
  );
}