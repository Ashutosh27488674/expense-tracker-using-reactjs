import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { createContext, useContext, useEffect, useState } from "react";
  import { auth } from "../firebase";
  
  const initialState = {
    user: {},
    signup: (email, password) => {},
    signin: (email, password) => {},
    signout: () => {},
    resetPassword: (email) => {},
  };
  
  const AuthContext = createContext(initialState);
  
  export const useAuth = () => useContext(AuthContext);
  
  export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);
  
    const signup = (email, password) =>
      createUserWithEmailAndPassword(auth, email, password);
  
    const signin = (email, password) =>
      signInWithEmailAndPassword(auth, email, password);
  
    const signout = () => signOut(auth);
  
    const resetPassword = (email) => sendPasswordResetEmail(auth, email);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });
  
      return unsubscribe;
    }, []);
    const authValue = {
      user: currentUser,
      signin,
      signup,
      signout,
      resetPassword,
    };
  
    return (
      <AuthContext.Provider value={authValue}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };