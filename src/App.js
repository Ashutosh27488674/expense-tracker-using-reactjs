import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import BudgetProvider from './store/BudgetProvider';
import {Routes ,Route} from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import PrivateRoute from './components/routes/PrivateRoute';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
          <Route path='/login' element={<Login /> } />
        <Route path="/" element={<PrivateRoute/>}>
          <Route path="/" element={<BudgetProvider ><Home /></BudgetProvider>}/>
        </Route>
          <Route path='/signup' element={<SignUp />}/>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </>
  )
}

export default App;
