import { createContext, useState } from 'react';

export const ChatContext = createContext(null);

export const ChatContextProvider = ({children}) => {
  
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);

  return(
    <ChatContext.Provider
      value={{
        currentChat,
        setCurrentChat,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}
