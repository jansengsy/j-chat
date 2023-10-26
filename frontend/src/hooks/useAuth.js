import { useState } from 'react';
import axios from 'axios';

export default function useAuth() {

  const [user, setUser] = useState(null);

  const login = async (user) => {
    const url = 'http://localhost:3000/login';

    const res = await axios.post(url, user, {
      headers: {
          'Content-Type': 'application/json',
      },
    });

    const { _id, username } = res.data;
    setUser({
      _id,
      username,
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

    return res.data;
  }

  return {
    user,
    login,
    register,
  }
}