import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import ExpenseOption from './Expense/ExpenseOption';
function Navbarr() {
  return (
    <>
      <Navbar className='text decoration-0'  bg="dark" data-bs-theme="dark">
        <Container className='my-3'>
          <Link to="/" className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md text-2xl border border-green-700 transition' style={{textDecoration: 'none'}}> 💰Expense Tracker</Link>
          <Link to="/dashboard" className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md text-2xl border border-green-700 transition' style={{textDecoration: 'none'}}> Dashboard</Link>
          {/* <Link to="/expenses" className=bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md text-2xl border border-green-700 transition' style={{textDecoration: 'none'}}> Expenses</Link> */}
          <ExpenseOption/>
          <Link to="/login" className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md text-2xl border border-green-700 transition' style={{textDecoration: 'none'}}> Get Started</Link>
         
        </Container>
      </Navbar>
     
      
    </>
  );
}

export default Navbarr;