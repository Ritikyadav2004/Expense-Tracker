import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import ExpenseOption from './ExpenseOption';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
function Navbarr() {
  const { user, setUser } = useContext(UserContext) 
  const handleLogout = () => {
    localStorage.removeItem('user'); // Local storage se user data delete kiya
    setUser(null); // Context state ko null kiya taaki login state clear ho jaye
  };
  
  return (
    <>
      <Navbar className='text decoration-0'  bg="dark" data-bs-theme="dark">
        <Container className='my-3'>
          <Link to="/" className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md text-2xl border border-green-700 transition' style={{textDecoration: 'none'}}> 💰Expense Tracker</Link>
          <Link to="/dashboard" className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md text-2xl border border-green-700 transition' style={{textDecoration: 'none'}}> Dashboard</Link>
         
          <ExpenseOption/>
          {/* if user logged in than put theri name and logout button   */}
          {user ? (
            <div className="d-flex align-items-center gap-3">
              
              <span className="text-white font-semibold text-xl">👤 Welcome, {user.name}</span>
              
              {/* Logout Button */}
              <button 
                onClick={handleLogout} 
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 rounded-md text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (   // this will handle else part if uuser not logged in
            //show get started button
            <Link to="/login" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md text-2xl border border-green-700 transition text-decoration-none" style={{textDecoration: 'none'}}>
              Get Started
            </Link>
          )}
         
        </Container>

      </Navbar>
     
      
    </>
  );
}

export default Navbarr;