import { useState, useContext } from "react";
import { chatToRoom } from "../../socket";
import { AuthContext } from "../../context/authContext";

export default function MessageBar({room}) {

  const { user } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    chatToRoom({ room: room, message: inputValue, user_id: user._id });
    setInputValue('');
  };

  return (
    <div className="message-bar">
      <input
        className="message-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        />
      <button
        className="message-button"
        onClick={handleSendMessage}
      >
        Send Message
      </button>
    </div>
  );
}
