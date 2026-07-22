import Card from 'react-bootstrap/Card';
import UserContext from '../context/UserContext';
import ContextProvider from '../context/ContextProvider';
import React, { useContext ,useState } from 'react';
import FilterBar from './FilterBar';
import Dropdown from 'react-bootstrap/Dropdown';
function ExpenseCard({mode}) {
  
  // expense will fethced when this button clicked and load data from Context api
  const {expenses , setExpenses} = useContext(UserContext);
  const [filteredExpenses, setFilteredExpenses] = useState(null);
  const [activeFilter, setActiveFilter] = useState(false);// to track whether it is active or not
  const [category, setCategory] = useState(''); // State to hold the selected category for filtering
  const [selectedCategory, setSelectedCategory] = useState(''); // State to hold the selected category for filtering
  const [showTotal,setShowTotal] = useState(false);

  const handleEdit=(id)=>{
            
            console.log(`Edit expense with id: ${id}`);
           
            
          }  
          
          const handleDelete=(id)=>{
            console.log(`Delete expense with id: ${id}`);
            // Context state update 
          const updatedExpenses = expenses.filter(exp => exp.id !== id);
          setExpenses(updatedExpenses);
          
          // LocalStorage update done
          localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
          const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
           if (confirmDelete) {
         
          alert("Expense deleted successfully!");
        }
}

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
      setShowTotal(!showTotal);
   
   
 } 

const handleFilterByCategory = (val) => {
    if (val === 'All') {
    // incase of reset
    setFilteredExpenses(null);
    setSelectedCategory('All');
  } else if (selectedCategory === val) {
    //if same catagory is selected again thrn do noting
    setFilteredExpenses(null);
    setSelectedCategory('');
  }  else {
       setSelectedCategory(val)
      const filtered = expenses.filter(expense => expense.category === val);
      setFilteredExpenses(filtered);
      setActiveFilter(true);
    }
  };  
  const displayExpenses = filteredExpenses !== null ? filteredExpenses : expenses;
  
  


  return (
    <div className="border text-slate-800  p-3 m-2 text-center">
    <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
      {expenses.length===0 ? (
        <p className="text-center text-gray-500">No expenses found.</p>
      ) : (        
                                                                   // else part
       
        
         <>
         {mode==='view' || mode==='dashboard' ? <h1>This Much Amount you have Spent</h1> : null}
          <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
  {displayExpenses.map((expense) => (
    <Card
      key={expense.id}
      bg="primary"
      text="white"
      style={{ width: '10rem' }}
      className="mb-2 m-2 p-2 flex flex-col items-center text-center"
    > 
    
      <Card.Header className="font-bold">{expense.category}</Card.Header>
      <Card.Body>
        <Card.Title>{Number(expense.amount).toFixed(2)} ₨</Card.Title>
        <Card.Text>{expense.date}</Card.Text>
      </Card.Body>
     <div className="flex justify-center w-full mt-2 items-center space-x-4">
      {mode === 'edit' && (<button onClick={()=>handleEdit(expense.id)} className="btn btn-success btn-sm mt-2 " style={{backgroundColor: '#28a745', borderColor: '#28a745' , hover: { backgroundColor: '#218838', borderColor: '#1e7e34' }}}>Edit</button>
     
    
    )}
      {mode === 'delete' && (<button onClick={()=>handleDelete(expense.id)} className="btn btn-danger btn-sm mt-2 ">Delete</button>)}
      
    </div>
    </Card>
  ))}
</div>
         </>

         
       
      ) }
    </div>

   {(mode==="view" ||  mode=== "dashboard") && ( 
    <div className="flex justify-center space-x-4 mt-4 gap-1.5">
       <Dropdown onSelect={(val) => handleFilterByCategory(val)}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic" className="bg-indigo-600 text-white py-2 px-4 rounded-md border-none"> {activeFilter ? `Category: ${selectedCategory}` : 'Filter by Category'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="All">Show All (Reset)</Dropdown.Item>
        <Dropdown.Item eventKey="Food">Food</Dropdown.Item>
        <Dropdown.Item eventKey="Travel">Travel</Dropdown.Item>
        <Dropdown.Item eventKey="Shopping">Shopping</Dropdown.Item>
        <Dropdown.Item eventKey="Entertainment">Entertainment</Dropdown.Item>
        <Dropdown.Item eventKey="Health">Health</Dropdown.Item>
        <Dropdown.Item eventKey="Bills">Bills</Dropdown.Item>
        <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      <button onClick={()=>handleAmountPerCategory(expenses)} className="bg-indigo-600 text-white py-2 px-4  hover:bg-indigo-700">Show Amount per Category</button>
      <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">View  Expense Graph</button>
    </div>)}

    {/* Agar showTotals true hai, toh premium boxes me totals dikhao */}
{showTotal && (
  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-4 w-full max-w-4xl mx-auto shadow-sm">
    <h3 className="font-bold text-slate-800 mb-3 text-lg text-center">Total Spent Per Category</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm font-semibold">
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">🍔 Food: <span className="text-indigo-600">{food} ₨</span></div>
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">🚗 Travel: <span className="text-indigo-600">${travel} ₨</span></div>
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">🛍️ Shopping: <span className="text-indigo-600">${shopping} ₨</span></div>
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">🎬 Entertainment: <span className="text-indigo-600">${entertainment}₨</span></div>
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">🏥 Health: <span className="text-indigo-600">${health} ₨</span></div>
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">🔌 Bills: <span className="text-indigo-600">${bills} ₨</span></div>
      <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">📦 Other: <span className="text-indigo-600">${other} ₨</span></div>
    </div>
  </div>
)}
    </div>
   
  );
}

export default ExpenseCard;
