import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { RoomContext } from "../../context/roomContext";
import { joinRoom } from "../../socket";

import '../../styles/nav.css'

export default function Nav() {

  const { user, deleteToken, deleteUser } = useContext(AuthContext);
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
    <div className="sidenav">
      <div className="header">
        <h2 className="nav-header">J-Chat</h2>
        <p className="nav-welcome">{`Welcome, ${user.username}!`}</p>
      </div>
      <div className="nav-menu">
        <ul>
          <li className='nav-item' onClick={() => handleJoinRoom(1)}>Room 1</li>
          <li className='nav-item' onClick={() => handleJoinRoom(2)}>Room 2</li>
          <li className='nav-item' onClick={() => handleJoinRoom(3)}>Room 3</li>
        </ul>
      </div>
      <button onClick={handleLogout} className='logout-button'>Logout</button>
    </div>
  );
}
