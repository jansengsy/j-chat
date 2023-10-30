import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";

import { RoomContextProvider } from "../context/roomContext";
import { AuthContext } from "../context/authContext";

import socket from '../socket';

import Nav from "../components/nav/Nav";
import VerificationBanner from "../components/VerificationBanner";

export default function Home() {

  const {user} = useContext(AuthContext);

  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <>
      { user.verified === false ? <VerificationBanner /> : <></> }
      <RoomContextProvider>
        <Nav />
        <Outlet />
      </RoomContextProvider>
    </>
  )
}