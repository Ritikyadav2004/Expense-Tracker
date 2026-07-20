import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navbarr() {
  return (
    <>
      <Navbar className='text decoration-0'  bg="dark" data-bs-theme="dark">
        <Container className='my-3'>
          <Link to="/" className='text-white text-2xl' style={{textDecoration: 'none'}}> 💰Expense Tracker</Link>
          <Link to="/dashboard" className='text-white text-2xl' style={{textDecoration: 'none'}}> Dashboard</Link>
          <Link to="/expenses" className='text-white text-2xl' style={{textDecoration: 'none'}}> Expenses</Link>
          <Link to="/login" className='text-white text-2xl' style={{textDecoration: 'none'}}> Get Started</Link>
         
        </Container>
      </Navbar>
     
      
    </>
  );
}

export default Navbarr;