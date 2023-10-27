import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function Message({message}) {

  const {user} = useContext(AuthContext);

  return (
    <div className={`message ${user._id === message.user_id._id ? 'my-message' : 'other-message'}`}>
      <span className="message-user"><strong>{message.user_id.username}:</strong></span>
      <div className="message-content">
        <span>{message.content}</span>
        <span className="message-timestamp">{new Date(message.timestamp).toLocaleString()}</span>
      </div>
    </div>
  );
}
