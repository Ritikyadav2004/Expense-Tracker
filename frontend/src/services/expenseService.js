
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const getLocalCache = (key, fallback = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const setLocalCache = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Could not write to local cache:", e);
  }
};

/**
 * Fetch all expenses for a user
 * @param {string} userId
 */
export const getExpenses = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/expenses?userId=${userId}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to fetch expenses");
    }
    const data = await response.json();
    setLocalCache(`trackify_expenses_${userId}`, data);
    return data;
  } catch (error) {
    console.warn("Backend API unavailable or offline, loading local store:", error.message);
    const cached = getLocalCache(`trackify_expenses_${userId}`, [
      {
        _id: 'sample_1',
        category: 'Food',
        amount: 850,
        date: new Date().toISOString().split('T')[0],
        user: userId
      },
      {
        _id: 'sample_2',
        category: 'Travel',
        amount: 2400,
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        user: userId
      },
      {
        _id: 'sample_3',
        category: 'Bills',
        amount: 3200,
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
        user: userId
      }
    ]);
    return cached;
  }
};

/**
 * Save a new expense
 * @param {Object} expenseData
 */
export const addExpense = async (expenseData) => {
  try {
    const response = await fetch(`${BASE_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to save expense");
    }
    const saved = await response.json();
    const cacheKey = `trackify_expenses_${expenseData.userId}`;
    const current = getLocalCache(cacheKey, []);
    setLocalCache(cacheKey, [saved, ...current]);
    return saved;
  } catch (error) {
    console.warn("Backend API unavailable, saving to local store:", error.message);
    const newRecord = {
      ...expenseData,
      _id: 'local_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    const cacheKey = `trackify_expenses_${expenseData.userId}`;
    const current = getLocalCache(cacheKey, []);
    setLocalCache(cacheKey, [newRecord, ...current]);
    return newRecord;
  }
};

/**
 * Update an existing expense by id
 * @param {string} id
 * @param {Object} expenseData
 */
export const updateExpense = async (id, expenseData) => {
  try {
    const response = await fetch(`${BASE_URL}/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to update expense");
    }
    const updated = await response.json();
    
    // Sync to all user caches in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('trackify_expenses_')) {
        const list = getLocalCache(key, []);
        const nextList = list.map(item => item._id === id ? { ...item, ...expenseData, ...updated } : item);
        setLocalCache(key, nextList);
      }
    }
    return updated;
  } catch (error) {
    console.warn("Backend API unavailable, modifying in local store:", error.message);
    const updatedRecord = {
      _id: id,
      ...expenseData,
      updatedAt: new Date().toISOString()
    };
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('trackify_expenses_')) {
        const list = getLocalCache(key, []);
        const nextList = list.map(item => item._id === id ? { ...item, ...expenseData } : item);
        setLocalCache(key, nextList);
      }
    }
    return updatedRecord;
  }
};

/**
 * Delete expense by id
 * @param {string} id
 */
export const deleteExpense = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/expenses/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to delete expense");
    }
    const data = await response.json();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('trackify_expenses_')) {
        const list = getLocalCache(key, []);
        setLocalCache(key, list.filter(item => item._id !== id));
      }
    }
    return data;
  } catch (error) {
    console.warn("Backend API unavailable, removing from local store:", error.message);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('trackify_expenses_')) {
        const list = getLocalCache(key, []);
        setLocalCache(key, list.filter(item => item._id !== id));
      }
    }
    return { message: "Expense deleted successfully" };
  }
};

/**
 * Authenticate credentials for user login
 * @param {Object} credentials
 */
export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Login failed");
  }
  return data;
};

/**
 * Register a new user account
 * @param {Object} userData
 */
export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Registration failed");
  }
  return data;
};
