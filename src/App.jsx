import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from './Component/Login/Login';
import Home from './Component/Home/Home';
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./Component/FirebaseConfig";
import { GithubAuthProvider } from "firebase/auth/web-extension";

function App() {

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const provider = new GithubAuthProvider();
    const signInWithGithub = async () => {
        try {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GithubAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.customData.email;
                    const credential = GithubAuthProvider.credentialFromError(error);
                });
        } catch (error) {
            console.error("Error signing in with Google", error);
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
