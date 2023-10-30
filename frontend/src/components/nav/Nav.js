import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { RoomContext } from "../../context/roomContext";
import { joinRoom } from "../../socket";

import PageHeader from "../PageHeader";

import '../../styles/nav.css'

export default function Nav() {

  const { deleteToken, deleteUser } = useContext(AuthContext);
  const { room, setRoom } = useContext(RoomContext);

  const handleLogout = (e) => {
    e.preventDefault();
    deleteUser('user');
    deleteToken('token');
  }

  const handleJoinRoom = async (roomID) => {
    joinRoom(roomID);
    setRoom(roomID);
  }

  return (
    <>
      <div className="sidenav">
        {/* <div className="header">
          <h2 className="nav-header">J-Chat</h2>
          <p className="nav-welcome">{`Welcome, ${user.username}!`}</p>
        </div> */}
        <div className="nav-menu">
          <ul>
            <li
              className={`nav-item ${ room === 1 ? 'selected-nav-item' : ''}`}
              onClick={() => handleJoinRoom(1)}
            >
              Room 1
            </li>
            <li
              className={`nav-item ${ room === 2 ? 'selected-nav-item' : ''}`}
              onClick={() => handleJoinRoom(2)}
            >
              Room 2
            </li>
            <li
              className={`nav-item ${ room === 3 ? 'selected-nav-item' : ''}`}
              onClick={() => handleJoinRoom(3)}
            >
              Room 3
            </li>
            <li
              className={`nav-item ${ room === 4 ? 'selected-nav-item' : ''}`}
              onClick={() => handleJoinRoom(4)}
            >
              Room 4
            </li>
            <li
              className={`nav-item ${ room === 5 ? 'selected-nav-item' : ''}`}
              onClick={() => handleJoinRoom(5)}
            >
              Room 5
            </li>
            <li
              className={`nav-item ${ room === 6 ? 'selected-nav-item' : ''}`}
              onClick={() => handleJoinRoom(6)}
            >
              Room 6
            </li>
          </ul>
        </div>
        <button onClick={handleLogout} className='logout-button'>Logout</button>
      </div>
    </>
  );
}
