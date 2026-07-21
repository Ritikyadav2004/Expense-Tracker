import React from 'react'

const FilterBar = ({data}) => {
  return (
    <div>


         <h1>filter by amount greater than:  or in category</h1>
          <Card
      key={data.id}
      bg="primary"
      text="white"
      style={{ width: '10rem' }}
      className="mb-2 m-2 p-2 flex flex-col items-center text-center"
    > 
    
      <Card.Header className="font-bold">{data.category}</Card.Header>
      <Card.Body>
        <Card.Title>{Number(data.amount).toFixed(2)} ₨</Card.Title>
        <Card.Text>{data.date}</Card.Text>
      </Card.Body>
    
    </Card>
    </div>
  )
}

export default FilterBar
