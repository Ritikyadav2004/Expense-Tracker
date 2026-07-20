import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>Login here
        <h1>Not have Account</h1>
         <Link 
      to="/signup" 
      className="btn btn-secondary text-black text-decoration-none"
    >
      Sign Up
    </Link>
    </div>
  )
}

export default Login