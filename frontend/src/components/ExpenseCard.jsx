import Card from 'react-bootstrap/Card';
import UserContext from '../context/UserContext';
import ContextProvider from '../context/ContextProvider';
import React, { useContext ,useState  } from 'react';
import FilterBar from './FilterBar';
import { Navigate } from "react-router-dom";
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
         
          
          // LocalStorage update done
          const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
          if (confirmDelete) {
            const updatedExpenses = expenses.filter(exp => exp.id !== id);
            setExpenses(updatedExpenses);
            localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
         
          alert("Expense deleted successfully!");
        }
}





const handleFilterByCategory = (val) => {
    if (val === '') {
    // incase of reset
    setFilteredExpenses(null);
    setSelectedCategory('');
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
      {(mode==="view" ||  mode=== "dashboard") && ( 
    <div className="flex justify-center space-x-4 mt-4 gap-1.5">
       <Dropdown onSelect={(val) => handleFilterByCategory(val)}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic" className="bg-indigo-600 text-white py-2 px-4 rounded-md border-none"> {activeFilter ? `Category: ${selectedCategory}` : 'Filter by Category'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="">Show All (Reset)</Dropdown.Item>
        <Dropdown.Item eventKey="Food">Food</Dropdown.Item>
        <Dropdown.Item eventKey="Travel">Travel</Dropdown.Item>
        <Dropdown.Item eventKey="Shopping">Shopping</Dropdown.Item>
        <Dropdown.Item eventKey="Entertainment">Entertainment</Dropdown.Item>
        <Dropdown.Item eventKey="Health">Health</Dropdown.Item>
        <Dropdown.Item eventKey="Bills">Bills</Dropdown.Item>
        <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
      <button onClick={()=>setShowTotal(!showTotal)} className="bg-indigo-600 text-white py-2 px-4  hover:bg-indigo-700">Show Amount per Category</button>
      <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">View  Expense Graph</button>
    </div>)}

    {showTotal===true &&<Navigate to="/show-per-category" />}
    <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
      {expenses.length===0 ? (
        <p className="text-center text-gray-500">No expenses found.</p>
      ) : (        
                                                                   // else part
       
        
         <>
         {mode==='view' || mode==='dashboard' ? <h1>This Much Amount you have {selectedCategory ? selectedCategory : "Spent"} </h1> : null}
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

   
    </div>
   
  );
}

export default ExpenseCard;
