const express = require('express');
const mongoose=require('mongoose')
const cors = require('cors');
const User = require('./models/User'); // Importedd User model for user log in and auth
const Expense = require('./models/Expense'); // Expense model for fetching and updating result 

const app=express();

const port=8000;

app.use(cors()); // Resolve Cross origin issue 
app.use(express.json()); // backend can read incomeing json data 

mongoose.connect('mongodb://localhost:27017/expenseTracker')
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("DB Connection Error: ", err));
app.get('/',(req,res)=>{
    res.send("Server Started running")
})


/**
 * @route POST /api/register
 * @desc Registers a new user in the database
 */
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email is already registered!" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save(); 
    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    res.status(500).json({ error: "Server Error during registration!" });
  }
});

/**
 * @route POST /api/login
 * @desc Authenticates user credentials and returns details
 */
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist!" });
    }
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password!" });
    }
    res.status(200).json({ message: "Login successful!", user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Server Error during login!" });
  }
});

/**
 * @route GET /api/expenses
 * @desc Fetches sorted expenses filtered by user ID
 */
app.get('/api/expenses', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required!" });
    }
    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expenses!" });
  }
});

/**
 * @route POST /api/expenses
 * @desc Adds a new expense item linked to a user
 */
app.post('/api/expenses', async (req, res) => {
  try {
    const { category, amount, date, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required to add expense!" });
    }
    const newExpense = new Expense({ category, amount, date, user: userId });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to add expense!" });
  }
});

/**
 * @route DELETE /api/expenses/:id
 * @desc Deletes an expense item by its unique ID
 */
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete expense!" });
  }
});







app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})