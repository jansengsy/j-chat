import { useContext } from "react";
import { Outlet } from "react-router-dom";

import { AuthContext } from "../context/authContext";

import Nav from "../components/nav/Nav";

export default function Home() {

  const { deleteToken } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    deleteToken('token');
  }

  return (
    <>
      <Nav />
      <div className='page-container'>
        <h1>Home!</h1>
        <button onClick={handleLogout}>Logout!</button>
        <Outlet />
      </div>
    </>
  )
}