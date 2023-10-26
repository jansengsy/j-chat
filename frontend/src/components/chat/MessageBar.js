import { useState } from "react";
import { chatToRoom } from "../../socket";

export default function MessageBar({room}) {

  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    chatToRoom({ room: room, message: inputValue });
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
