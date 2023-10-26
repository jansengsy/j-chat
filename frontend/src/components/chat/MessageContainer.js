export default function MessageContainer({messages}) {
  return (
    <div className='message-container'>
      <ul>
        {messages.map((message, index) => (
          <li className='message' key={index}>
            {`${message.user_id} wrote: `} <strong>{`${message.content} `}</strong>, {`at: ${message.timestamp}`}
          </li>
          ))}
      </ul>
    </div>
  );
}
