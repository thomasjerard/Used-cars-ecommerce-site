import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log('User signed out successfully');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <UserContext.Provider value={{ user, signOut}}>
      {children}
    </UserContext.Provider>
  );
};