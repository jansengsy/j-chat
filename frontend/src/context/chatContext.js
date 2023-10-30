import { createContext, useState } from 'react';

export const ChatContext = createContext(null);

export const ChatContextProvider = ({children}) => {
  
  const [chat, setChat] = useState(null);

  return(
    <ChatContext.Provider
      value={{
        chat,
        setChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
