import React from 'react'
import Balance from '../components/balancebox/Balance'
import ExpenseForm from '../components/ExpenseForm'
import Transaction from '../components/transaction/Transaction'
import { useAuth } from '../store/AuthProvider'


const Home = () => {
    const {user}=useAuth();
    console.log(user);
  return (
    <>
      <Balance />
      <ExpenseForm />
      <Transaction />
    </>
  )
}

export default Home
