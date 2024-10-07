import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Component/FirebaseConfig";


function App() {
  const [user, setUser]= useState(false);
  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        setUser(null); 
      //  window.location.assign("/login")
      }
    });

    return () => unsubscribe();
  }, [auth]);
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path='/' element={<> {user ? <Home/>:<Login/>}</>}></Route>
          <Route path='/Login' element={<><Login/></>}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
