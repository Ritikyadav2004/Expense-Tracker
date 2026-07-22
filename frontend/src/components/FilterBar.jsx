import React from 'react'
import Card from 'react-bootstrap/Card';
import UserContext from '../context/UserContext';
import { useState  , useContext} from 'react';
import BackButton from './BackButton';
const FilterBar = () => {
  // creating varible to store amount/category
  const { expenses } = useContext(UserContext)
     
     let foodAmount=0;
     let travelAmount=0;
     let shoppingAmount=0;
     let entertainmentAmount=0;
     let healthAmount=0;
     let billsAmount=0;
     let otherAmount=0;
     let educationAmount=0;
  expenses.forEach(expense=>{
    
       if(expense.category==="Food")
       {
           foodAmount+=Number(expense.amount)
       }
       else if(expense.category==="Travel")
       {
           travelAmount+=Number(expense.amount)
       }

       else if(expense.category==="Bills")
       {
            billsAmount+=Number(expense.amount)
       }

       else if(expense.category==="Shopping")
       {
               shoppingAmount+=Number(expense.amount)
       }
       else if(expense.category==="Entertainment")
       {
           entertainmentAmount+=Number(expense.amount)
       }
       else if(expense.category==="Health")
       {
            healthAmount+=Number(expense.amount)
       }
       else if(expense.category==="Other")
       {
            otherAmount+=Number(expense.amount)
       }
        else if(expense.category==="Education")
       {
            educationAmount+=Number(expense.amount)
       }
       
      })


      

      // for checking whether  we recieving the data correctly or not
      // console.log("total food cost "+foodAmount)
      // console.log("total travel cost "+travelAmount)
      // console.log("total bill cost "+billsAmount)
      // console.log("total health cost "+healthAmount)
      // console.log("total other cost "+otherAmount)
      // console.log("total shopping cost "+shoppingAmount)
      // console.log("total entertainment cost "+entertainmentAmount)
   
  return (
    <div>  
         {/* Agar showTotals true hai, toh premium boxes me totals dikhao */}

    <BackButton/>

    {expenses.length===0 ? (<h1 className='text-center'>No Expense Found !</h1>) :(
  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 my-4 w-full max-w-3xl mx-auto shadow-sm">
    <h3 className="font-bold text-slate-800 mb-3 text-lg text-center">Total Spent Per Category</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm font-semibold">
      <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-2xl flex flex-col items-center justify-center">Food: <br /><span className="text-indigo-600">{foodAmount} ₨  </span></div>
      <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-2xl flex flex-col items-center justify-center"> Travel: <span className="text-indigo-600">{travelAmount } ₨ </span></div>
      <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-2xl flex flex-col items-center justify-center"> Shopping: <span className="text-indigo-600">{shoppingAmount} ₨</span></div>
      <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-2xl flex flex-col items-center justify-center"> Entertainment: <span className="text-indigo-600">{entertainmentAmount} ₨</span></div>
      <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-2xl flex flex-col items-center justify-center"> Health: <span className="text-indigo-600">{healthAmount} ₨</span></div>
      <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-2xl flex flex-col items-center justify-center"> Bills: <span className="text-indigo-600">{billsAmount} ₨</span></div>
      <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-2xl flex flex-col items-center justify-center"> Other: <span className="text-indigo-600">{otherAmount} ₨</span></div> 
      <div className="p-2 bg-green-500 rounded-lg shadow-sm border border-slate-100 text-2xl flex flex-col items-center justify-center text-white"> Total Amount: <span className="text-white">{otherAmount+foodAmount+travelAmount+shoppingAmount+entertainmentAmount+healthAmount+billsAmount+educationAmount} ₨</span></div> 
      <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100 text-2xl flex flex-col items-center justify-center"> Education: <span className="text-indigo-600">{educationAmount} ₨</span></div> 
   
    
        
    </div>
      
  </div>)}
    



    </div>
  )
}

export default FilterBar