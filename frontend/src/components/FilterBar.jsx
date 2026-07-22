import React from 'react'
import { useState } from 'react';
const FilterBar = ({expenses}) => {
  // creating varible to store amount/category
      const [food,setFood] = useState(0);
      const [travel,setTravel] = useState(0);
      const [shopping,setShopping] = useState(0);
      const [entertainment,setEntertainment] = useState(0);
      const [health,setHealth] = useState(0);
      const [bills,setBills] = useState(0);
      const [other,setOther] = useState(0);

   const handleAmountPerCategory=(expenses)=>{
     let foodAmount=0;
     let travelAmount=0;
     let shoppingAmount=0;
     let entertainmentAmount=0;
     let healthAmount=0;
     let billsAmount=0;
     let otherAmount=0;
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
       
      })


      setFood(foodAmount)
      setTravel(travelAmount)
      setEntertainment(entertainmentAmount)
      setBills(billsAmount)
      setHealth(healthAmount)
      setOther(otherAmount)
      setShopping(shoppingAmount)

      // for checking whether  we recieving the data correctly or not
      // console.log("total food cost "+food)
      // console.log("total travel cost "+travel)
      // console.log("total bill cost "+bills)
      // console.log("total health cost "+health)
      // console.log("total other cost "+other)
      // console.log("total shopping cost "+shopping)
      // console.log("total entertainment cost "+entertainment)
      
   
   
 } 
  return (
    <div>
         {/* Agar showTotals true hai, toh premium boxes me totals dikhao */}
 
  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-4 w-full max-w-4xl mx-auto shadow-sm">
    <h3 className="font-bold text-slate-800 mb-3 text-lg text-center">Total Spent Per Category</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm font-semibold">
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">🍔 Food: <span className="text-indigo-600">${food.toFixed(2)}</span></div>
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">🚗 Travel: <span className="text-indigo-600">${travel.toFixed(2)}</span></div>
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">🛍️ Shopping: <span className="text-indigo-600">${shopping.toFixed(2)}</span></div>
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">🎬 Entertainment: <span className="text-indigo-600">${entertainment.toFixed(2)}</span></div>
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">🏥 Health: <span className="text-indigo-600">${health.toFixed(2)}</span></div>
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">🔌 Bills: <span className="text-indigo-600">${bills.toFixed(2)}</span></div>
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">📦 Other: <span className="text-indigo-600">${other.toFixed(2)}</span></div>
    </div>
  </div>



    </div>
  )
}

export default FilterBar