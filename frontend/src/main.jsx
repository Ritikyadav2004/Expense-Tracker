import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , createRoutesFromElements , Route, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import  './index.css'

import App from './App'
import ExpenseCard from './components/ExpenseCard';
import ExpenseOption from './components/Expense/ExpenseOption';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddExpense from './components/Expense/AddExpense';


import ContextProvider from './context/ContextProvider';

const router=createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<App />}>
     
    <Route path='/' element={<Home/>}/>
    <Route path='/dashboard' element={<ExpenseCard  mode="dashboard"/>} />
    {/* <Route path='/expenses' element={<ExpenseOption />} /> */}
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/add-expense' element={<AddExpense/>}/>
    <Route path='/view-expense' element={<ExpenseCard mode="view"/>}/>
    <Route path='/edit-expense' element={<ExpenseCard mode="edit"/>}/>
    <Route path='/delete-expense' element={<ExpenseCard mode="delete"/>}/>
    {/* <Route path='/view-expense-summary' element={<ViewExpenseCard/>}/> */}



  </Route>

  

  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
