import axios from 'axios';

export default function useAuth() {

  const login = async (user) => {
    const url = 'http://localhost:3000/login';

    const res = await axios.post(url, user, {
      headers: {
          'Content-Type': 'application/json',
      },
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
    login,
    register,
  }
}