import Card from 'react-bootstrap/Card';
import UserContext from '../../context/UserContext';
import ContextProvider from '../../context/ContextProvider';
import React, { useContext } from 'react';

const EditExpense = () => {
  const {expenses}=useContext(UserContext);
 return (
    <>
    <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
      {expenses.length===0 ? (
        <p className="text-center text-gray-500">No expenses found.</p>
      ) : (
        
          <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
  {expenses.map((expense) => (
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
     <div className="flex justify-between w-full mt-2">
      
    </div>
    <div className="flex justify-between w-full mt-2">
      <button className="btn btn-success mr-2">Edit</button>
      
    </div>
    </Card>
  ))}
</div>

         
       
      ) }
    </div>

    <div className="flex justify-center space-x-4 mt-4 gap-1.5">
      <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Filter by Category</button>
      <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Filter by Date</button>
      <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Filter by Amount</button>
    </div>
    </>
   
  );
}

export default EditExpense