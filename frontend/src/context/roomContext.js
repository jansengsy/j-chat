import { createContext, useState } from 'react';

export const RoomContext = createContext(null);

export const RoomContextProvider = ({children}) => {
  
  const [room, setRoom] = useState(null);

  return(
    <RoomContext.Provider
      value={{
        room,
        setRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
