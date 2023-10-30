import { useState } from 'react';
import axios from 'axios';

export default function useAuth() {

  const getUser = () => {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    return user;
  }

  const [user, setUser] = useState(getUser());

  const saveUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  const deleteUser = (key) => {
    localStorage.removeItem(key);
    setUser(null);
  }

  const verifyUser = () => {
    const user = getUser();
    const updatedUser = { ...user, verified: true };
    saveUser(updatedUser);
  }

  const login = async (user) => {
    const url = 'http://localhost:3000/login';

    const res = await axios.post(url, user, {
      headers: {
          'Content-Type': 'application/json',
      },
    });

    const { _id, username, email, verification_token, verified } = res.data;
    saveUser({
      _id,
      username,
      email,
      verification_token,
      verified,
    });

    return res.data;
  }

  const register = async (user) => {
    const url = 'http://localhost:3000/register';
    
    const res = await axios.post(url, user, {
      headers: {
          'Content-Type': 'application/json',
      },
    });

    const { _id, username, verified, verification_token, email } = res.data;
    saveUser({
      _id,
      username,
      email,
      verification_token,
      verified,
    });

    const emailUrl = 'http://localhost:3000/email/register';

    await axios.post(emailUrl, { verification_token, username, email}, {
      headers: {
          'Content-Type': 'application/json',
      },
    });

    return res.data;
  }

  return {
    user,
    getUser,
    deleteUser,
    login,
    register,
    verifyUser,
  }
}
