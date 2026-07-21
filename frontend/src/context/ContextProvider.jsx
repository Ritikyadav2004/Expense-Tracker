import React from 'react'
import Context from './Context'
const ContextProvider = ({children}) => {
  const [expenses, setExpenses] = React.useState([]);
  
  return (
    <Context.Provider value={{ expenses, setExpenses }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider