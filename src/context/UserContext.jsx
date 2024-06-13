import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return <UserContext.Provider value={{ setUser, user }}>{children}</UserContext.Provider>;
};
