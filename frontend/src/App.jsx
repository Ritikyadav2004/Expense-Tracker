import React from 'react'
import { Outlet } from 'react-router'
import Navbarr from './components/Navbarr'  
import Footer from './components/Footer'
import Carousel from 'react-bootstrap/Carousel';


const App = () => {
  return (

<>   
    
     <Navbarr/>
      <Outlet/>
     <Footer/>
     

</>
  )
}

export default App