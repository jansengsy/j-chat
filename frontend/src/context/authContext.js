import { createContext } from 'react';

// Hooks
import useToken from '../hooks/useToken';
import useAuth from '../hooks/useAuth';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
  const { token, getToken, saveToken, deleteToken } = useToken();
  const { user, login, register } = useAuth();

  return(
    <AuthContext.Provider
      value={{
        token,
        getToken,
        saveToken,
        deleteToken,
        user,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}