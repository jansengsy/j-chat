import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { RoomContextProvider } from "../context/roomContext";

import socket from '../socket';

import Nav from "../components/nav/Nav";

export default function Home() {

  const { deleteToken } = useContext(AuthContext);

  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <>
      <RoomContextProvider>
        <Nav />
        <Outlet />
      </RoomContextProvider>
    </>
  )
}