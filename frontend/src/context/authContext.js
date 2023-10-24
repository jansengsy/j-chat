import { createContext } from 'react';

// Hooks
import useToken from '../hooks/useToken';
import useAuth from '../hooks/useAuth';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
  const { token, getToken, saveToken, deleteToken } = useToken();
  const { login, register } = useAuth();

  return(
    <AuthContext.Provider
      value={{
        token,
        getToken,
        saveToken,
        deleteToken,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}