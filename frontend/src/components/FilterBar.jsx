import React from 'react'

const FilterBar = ({foodAmount, travelAmount ,  entertainmentAmount , billsAmount , healthAmount , otherAmount , shoppingAmount}) => {
  return (
    <div> 

               <Card
     
      bg="primary"
      text="white"
      style={{ width: '10rem' }}
      className="mb-2 m-2 p-2 flex flex-col items-center text-center"
    > 
    
      <Card.Header className="font-bold">Food</Card.Header>
      <Card.Body>
        <Card.Title>Total Expense {foodAmount} ₨</Card.Title>
       
      </Card.Body>
     
    </Card>      
    </div>
  )
}

export default FilterBar