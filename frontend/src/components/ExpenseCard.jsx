import Card from 'react-bootstrap/Card';

function ExpenseCard() {
  return (
    <>
    <Card
      bg="primary"
      text="white"
      style={{ width: '10rem' }}
      className="mb-2 justify-around m-2 p-2 flex flex-col items-center text-center"
    >
      <Card.Header className="font-bold ">Category</Card.Header>
      <Card.Body>
        <Card.Title>Amount</Card.Title>
        
        <Card.Text>
          DATE
        </Card.Text>
      </Card.Body>
    </Card>

    <div className="flex justify-center space-x-4 mt-4 gap-1.5">
      <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Filter by Category</button>
      <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Filter by Date</button>
      <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Filter by Amount</button>
    </div>
    </>
   
  );
}

export default ExpenseCard;
