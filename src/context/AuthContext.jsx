import React, { createContext, useContext, useState } from 'react';
import storage, { generateId } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => storage.getCurrentUser());

  const signup = (userData) => {
    const users = storage.getUsers();
    const emailExists = users.some(u => u.email === userData.email);
    
    if (emailExists) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: generateId('usr'),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      bio: '',
      location: '',
      avatar: null,
      coverImage: null,
      joinedAt: new Date().toISOString(),
    };

    storage.setUsers([...users, newUser]);
  };

  const login = (email, password) => {
    const users = storage.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Strip password field before saving to currentUser state
    const { password: _, ...safeUser } = user;
    
    setCurrentUser(safeUser);
    storage.setCurrentUser(safeUser);
  };

  const logout = () => {
    setCurrentUser(null);
    storage.clearCurrentUser();
  };

  const updateCurrentUser = (updatedData) => {
    if (!currentUser) return;

    const mergedUser = { ...currentUser, ...updatedData };
    setCurrentUser(mergedUser);
    storage.setCurrentUser(mergedUser);

    // Update the main users array as well
    const users = storage.getUsers();
    const updatedUsers = users.map(u => u.id === mergedUser.id ? { ...u, ...updatedData } : u);
    storage.setUsers(updatedUsers);
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    signup,
    login,
    logout,
    updateCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
