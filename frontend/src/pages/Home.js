import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { RoomContextProvider } from "../context/roomContext";

import socket from '../socket';

import Nav from "../components/nav/Nav";

export default function Home() {

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