import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./Component/FirebaseConfig";
import { GithubAuthProvider } from "firebase/auth/web-extension";

function App() {

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
