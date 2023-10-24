import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { AuthContext } from "../context/authContext";

export default function Home() {

  const { deleteToken } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    deleteToken('token');
  }

  return (
    <div>
      <h1>Home!</h1>
      <button onClick={handleLogout}>Logout!</button>
      <Outlet />
    </div>
  )
}