import React from 'react'
import Context from './UserContext'
const ContextProvider = ({children}) => {
  const [expenses, setExpenses] = React.useState([]);

  // now we will fetch the data from local storage and se it in expense
  React.useEffect(()=>{
    const storedExpenses= JSON.parse(localStorage.getItem('expenses'));
    if(storedExpenses){
      setExpenses(storedExpenses);
    }
  },[])
  
  return (
    <Context.Provider value={{ expenses, setExpenses }}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider