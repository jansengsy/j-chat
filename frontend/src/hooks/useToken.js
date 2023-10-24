import { useState } from "react";

export default function useToken() {

  // Get the token from storage
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  }

  const [token, setToken] = useState(getToken());

  // Set the token into storage
  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  }

  // Delete the token from storage
  const deleteToken = (key) => {
    localStorage.removeItem(key);
    setToken(null);
  }

  return {
    token,
    getToken,
    saveToken,
    deleteToken,
  }
}
