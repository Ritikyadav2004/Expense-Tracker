
const BASE_URL = 'http://localhost:8000/api';

/**
 * Fetches all expenses for a specific user from the backend
 * @param {string} userId - The unique ID of the user
 * @returns {Promise<Array>} List of expenses
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
 * Adds a new expense to the database
 * @param {Object} expenseData - The expense details (amount, category, date, userId)
 * @returns {Promise<Object>} The saved expense object
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
 * Deletes a specific expense by ID
 * @param {string} id - Mongoose Object ID of the expense
 * @returns {Promise<Object>} Success message
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
 * Authenticates user credentials for Login
 * @param {Object} credentials - Email and Password
 * @returns {Promise<Object>} Logged in user details
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
 * Registers a new user account in the database
 * @param {Object} userData - User registration details (name, email, password)
 * @returns {Promise<Object>} Success message
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
