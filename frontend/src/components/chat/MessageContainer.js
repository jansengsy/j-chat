export default function MessageContainer({messages}) {
  return (
    <div className='message-container'>
      <ul>
        {messages.map((message, index) => (
          <li className='message' key={index}>{message}</li>
          ))}
      </ul>
    </div>
  );
}
