import { useEffect, useRef } from 'react';
import Message from './Message';

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
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      <div ref={messageContainerRef}/>
    </div>
  );
}
