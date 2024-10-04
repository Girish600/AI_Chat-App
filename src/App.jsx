import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./Component/FirebaseConfig";

function App() {

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };



  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element={<><Home/></>}></Route>
          <Route path='/Login' element={<><Login/></>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
