import { async } from '@firebase/util';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/AuthProvider';
import styles from './Navbar.module.css'

const NavBar = () => {
  const {user,signout}=useAuth();
  const handleSignOut = async() => await signout();
  return (
    <div className={styles.header}>
      <h2>My Expense Tracker</h2>
      {!user && <Link to="/login" >Login</Link>}
      {user && <button onClick={handleSignOut}>Logout</button>}

    </div>
  )
}

export default NavBar
