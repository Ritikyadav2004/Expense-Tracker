import React, { useState, useEffect } from 'react';
import Context from './UserContext';
import { getExpenses } from '../services/expenseService';

const ContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [user, setUser] = useState(null); 

  /**
   * Loads expenses from the server using the service layer
   */
  const fetchExpenses = async () => {
    if (!user || !user.id) return;
    try {
      const data = await getExpenses(user.id);
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // App load checking user details in local storage
  useEffect(() => {
    try {
      const loggedInUser = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('user') : null;
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
      }
    } catch (e) {
      console.warn("Storage access not available:", e);
    }
  }, []);

  // Sync expenses whenever user state changes
  useEffect(() => {
    if (user) {
      fetchExpenses();
    } else {
      setExpenses([]);
    }
  }, [user]);

  return (
    <Context.Provider value={{ expenses, setExpenses, fetchExpenses, user, setUser }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider