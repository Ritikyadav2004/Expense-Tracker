import React from 'react'
import { Link } from 'react-router-dom'
const ExpenseCard = () => {
  return (
    <>
      <h1>Expense Card</h1>
    <div className='text-center flex gap-4 justify-center flex-wrap'>
    

      <div>
         <Link
        to="/add-expense"
        className="btn btn-secondary text-black text-decoration-none"
      >
        Add Expense
      </Link>
      </div>

      <div>
         <Link
        to="/view-expense"
        className="btn btn-secondary text-black text-decoration-none"
      >
        View Expense
      </Link>
      </div>

      <div>
         <Link
        to="/edit-expense"
        className="btn btn-secondary text-black text-decoration-none"
      >
        Edit Expense
      </Link>
      </div>

      <div>
         <Link
        to="/delete-expense"
        className="btn btn-secondary text-black text-decoration-none"
      >
        Delete Expense
      </Link>
      </div>

     
    
     
    </div>
    </>
  )
}

export default ExpenseCard