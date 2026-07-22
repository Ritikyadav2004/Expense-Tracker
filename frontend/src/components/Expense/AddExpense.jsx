import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../BackButton';
import ExpenseSummary from '../ExpenseCard';
import UserContext from '../../context/UserContext';

const AddExpense = () => {
  const [category, setCategory] =useState('');
  const [amount , setAmount]=useState('');
  const [date , setDate]=useState('');
  
  const { setExpenses } = useContext(UserContext) || { setExpenses: () => {} };
  
  const handleSubmit=(e)=>{
    e.preventDefault();

    const expense = {
      id: Date.now(),// this done to provide unique id to each expense
      category,
      amount,
      date
    };

    // here is how we are saving the data in local storageh
    const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    existingExpenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(existingExpenses));

    // Update context state for real-time updates
    setExpenses(existingExpenses);

    alert("Expense saved!");
      console.log("Saved expense:", expense);
  }
  

  // created object to store the expese data 
  

     
  

  return (
    <div className='w-screen h-screen  bg-slate-200'>
      <BackButton/>
      

      
      <form 
  onSubmit={handleSubmit} 
  className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-5"
>
  {/* Category */}
  <div>
    <label 
      htmlFor="expenseCategory" 
      className="block text-gray-700 font-semibold mb-2"
    >
      Choose Expense Category:
    </label>
    <select
      id="expenseCategory"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      required
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value="">Select Expense Category</option>
      <option value="Food">Food</option>
      <option value="Travel">Travel</option>
      <option value="Shopping">Shopping</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Health">Health</option>
      <option value="Education">Education</option>
      <option value="Bills">Bills</option>
      <option value="Other">Other</option>
    </select>
  </div>

  {/* Amount */}
  <div>
    <label 
      htmlFor="amount" 
      className="block text-gray-700 font-semibold mb-2"
    >
      Expense Amount:
    </label>
    <input 
      type="number" 
      id="amount"
      min="0"   //  negative values not allowed
      value={amount} 
      onChange={(e)=>setAmount(e.target.value)} 
      placeholder="Enter amount" 
      required
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* Date */}
  <div>
    <label 
      htmlFor="date" 
      className="block text-gray-700 font-semibold mb-2"
    >
      Expense Date:
    </label>
    <input 
      type="date" 
      id="date"
      value={date} 
      required
      onChange={(e)=>setDate(e.target.value)} 
      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>

  {/* Submit */}
  <button 
    type="submit" 
    className="w-full mt-4 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition"
  >
    Add Expense
  </button>
</form>

    </div>
  )


}

export default AddExpense