const express = require('express');
const mongoose=require('mongoose')
const cors = require('cors');
const User = require('./models/User'); // Importedd User model for user log in and auth
const Expense = require('./models/Expense'); // Expense model for fetching and updating result 

const app=express();

const port=8000;

app.use(cors()); // Isse Frontend (port 5173) Backend (port 8000) se bina error ke baat kar payega
app.use(express.json()); // Isse backend incoming JSON body (req.body) ko read kar payega

mongoose.connect('mongodb://localhost:27017/expenseTracker')
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.log("DB Connection Error: ", err));
app.get('/',(req,res)=>{
    res.send("Server Started running")
})


app.post('/api/register', async (req, res) => {

    const { name, email, password } = req.body; // Frontend se data nikala
    // Check karein ki email pehle se register toh nahi hai
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email is already registered!" });
    }
    // Naya user document banakar database me save kiya
    const newUser = new User({ name, email, password });
    await newUser.save(); 
    res.status(201).json({ message: "Registration successful!" });

});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Database me user check kiya
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist!" });
    }
    // Password verify kiya (Abhi simple plain text validation kiya hai)
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid password!" });
    }
    // Success response
    res.status(200).json({ message: "Login successful!", user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Server Error during login!" });
  }
});

 
//Api for putting data into Dashboard
app.get('/api/expenses', async (req, res) => {
     
     const {userId} = req.query; // destructuring uer id from query

     if(!userId) {return ress.send(400).json({error:"USer is Required"})}

     // filtering in the data base user===userId

    const expenses = await Expense.find({user:userId}).sort({ date: -1 }); // Sorting and providing to context api in manner New expesne followed by old espens in frontend 
    res.status(200).json(expenses);
  
  
});





// Api for  adding  new data 
app.post('/api/expenses', async (req, res) => {
 
    const { category, amount, date , userId } = req.body;
    
    if(!userId)
    {
        return res.status(400).json({error:"user id is required to add expense"})
    }

    const newExpense = new Expense({ category, amount, date  , user:userId});   // creating new instance and linking the user with corresponding data 
    await newExpense.save(); // saving the data 
    
    res.status(201).json(newExpense);   // sending response to frontend 
 
});

app.delete('/api/expenses/:id', async (req, res) => {
 
    const { id } = req.params; // finding the id From route paramater 
    
    await Expense.findByIdAndDelete(id); // Database se delete kiya
    
    res.status(200).json({ message: "Expense deleted " });
 
});







app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`);
})