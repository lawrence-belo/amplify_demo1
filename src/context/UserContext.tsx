'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  name: string;
  setName: (name: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState('User');

  // Simple persistence: save to localStorage if available
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleSetName = (newName: string) => {
    setName(newName);
    localStorage.setItem('userName', newName);
  };

  return (
    <UserContext.Provider value={{ name, setName: handleSetName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
