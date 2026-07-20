import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter , createRoutesFromElements , Route, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import  './index.css'

import App from './App'
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseCard from './components/Expense/ExpenseCard';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddExpense from './components/Expense/AddExpense';
import EditExpense from './components/Expense/EditExpense';
import DeleteExpense from './components/Expense/DeleteExpense';


const router=createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<App />}>
     
    <Route path='/' element={<Home/>}/>
    <Route path='/dashboard' element={<ExpenseSummary />} />
    <Route path='/expenses' element={<ExpenseCard />} />
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/add-expense' element={<AddExpense/>}/>
    <Route path='/view-expense' element={<ExpenseSummary/>}/>
    <Route path='/edit-expense' element={<EditExpense/>}/>
    <Route path='/delete-expense' element={<DeleteExpense/>}/>
    {/* <Route path='/view-expense-summary' element={<ViewExpenseSummary/>}/> */}



  </Route>

  

  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
