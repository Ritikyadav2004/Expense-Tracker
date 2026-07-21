import React, { useState } from 'react'
import BackButton from '../BackButton'
import { Link } from 'react-router-dom';

import ExpenseSummary from '../ExpenseCard';

const AddExpense = () => {
  const [category, setCategory] =useState('');
  const [amount , setAmount]=useState('');
  const [date , setDate]=useState('');
  
  const handleSubmit=(e)=>{
    e.preventDefault();

    const expense = {
      category,
      amount,
      date
    };

    // here is how we are saving the data in local storageh
    const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    existingExpenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(existingExpenses));

     alert("Expense saved!");
  console.log("Saved expense:", expense);
  }
  

  // created object to store the expese data 
  

     
  

  return (
    <div>
      <BackButton/>
      

      
      <form action="" onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <label  className="block text-gray-700 font-semibold mb-2" htmlFor="expenseCategory">Choose Expense Category:</label>
      <select
        id="expenseCategory"
        // value={category}
        onChange={(e) => setCategory(e.target.value)}
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
       <br /> <br />

        <label  className="block text-gray-700 font-semibold mb-2"  htmlFor="amount">Expense Amount:</label>
        <input  type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Expense Amount" />
   
     <br /> <br />
        <label  className="block text-gray-700 font-semibold mb-2" htmlFor="date">Expense Date  :     </label>
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} placeholder="Expense Date" />
        <br />
        <button className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition" type="submit" >Add Expense</button> 
      </form>
    </div>
  )


}

export default AddExpense