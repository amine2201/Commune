import { createContext, useState } from 'react';
import { IAuthContext } from '../../Types/types';

export const AuthContext = createContext<Partial<IAuthContext>>({});

export const AuthContextProvider = ({ children } : any) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};
