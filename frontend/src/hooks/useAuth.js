import axios from 'axios';

export default function useAuth() {

  const login = async (user) => {

    const url = 'http://localhost:3000/login';
    
    try {
      const res = await axios.post(url, user, {
        headers: {
            'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  }

  const register = async (user) => {
    const url = 'http://localhost:3000/register';
    
    try {
      const res = await axios.post(url, user, {
        headers: {
            'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  }

  return {
    login,
    register,
  }
}