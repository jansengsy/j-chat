import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

import '../../styles/nav.css'

export default function Nav() {

  const { deleteToken } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    deleteToken('token');
  }

  return (
    <div className="sidenav">
      <div className="header">
        <h2>J-Chat</h2>
      </div>
      <div className="menu">
        <ul>
          <li>Chats</li>
          <li>Contacts</li>
          <li>Settings</li>
        </ul>
      </div>
      <button onClick={handleLogout} className='logout-button'>Logout</button>
    </div>
  );
}
