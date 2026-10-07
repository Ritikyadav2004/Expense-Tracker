
const BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Fetch all expenses for a user
 * @param {string} userId
 */
export const getExpenses = async (userId) => {
  const response = await fetch(`${BASE_URL}/expenses?userId=${userId}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch expenses");
  }
  return await response.json();
};

/**
 * Save a new expense
 * @param {Object} expenseData
 */
export const addExpense = async (expenseData) => {
  const response = await fetch(`${BASE_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expenseData)
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to save expense");
  }
  return await response.json();
};

/**
 * Delete expense by id
 * @param {string} id
 */
export const deleteExpense = async (id) => {
  const response = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to delete expense");
  }
  return await response.json();
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
