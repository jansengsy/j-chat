import { createContext } from 'react';

// Hooks
import useToken from '../hooks/useToken';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
  const { token, getToken, saveToken, deleteToken } = useToken();

  return(
    <AuthContext.Provider
      value={{
        token,
        getToken,
        saveToken,
        deleteToken
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}