import React from 'react'
import  { Link } from 'react-router-dom'
const Signup = () => {
  return (
    <div>
      <p>Signup here</p>
      <h2>Already Have account Login here  </h2>
       <Link 
      to="/login" 
      className="btn btn-secondary text-black text-decoration-none"
    >
      Login
    </Link>
        
      
       </div>
  )
}

export default Signup