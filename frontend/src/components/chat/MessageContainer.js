import { useEffect, useRef } from "react";

export default function MessageContainer({messages}) {

  const messageContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollIntoView({ behavior: 'instant' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='message-container'>
      <ul className='message-list'>
        {messages.map((message, index) => (
          <li className='message' key={index}>
            {`${message.user_id} wrote: `} <strong>{`${message.content} `}</strong>, {`at: ${message.timestamp}`}
          </li>
          ))}
      </ul>
      <div ref={messageContainerRef}/>
    </div>
  );
}
