import React, { useEffect, useState } from "react";
import OpenAI from "openai";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "./Home.css";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import Chat from '../Chat'
import { MdAddLink } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, 
});

function Home() {
  const [input, setinput] = useState("");
  const [message, setMessage] = useState([]);
  const [user, setUser]= useState(false);
  // const [data,setData]=useState(0);
  const [loading,setLoading]=useState(false);
  const navigate =useNavigate();
  const auth= getAuth();

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe();
  }, [auth]);

const handleLogout = () => {
  signOut(auth).then(() => {
    navigate('/Login');
  }).catch((error) => {
    console.error("Error logging out:", error);
    });
  };

  console.log("input", input);

  const chatOpenAi = async () => {
    if (!input)
      return Swal.fire({
        title: "warning",
        text: "please enter your prompt",
        icon: "warning",
        confirmButtonText: "ok",
      });

      setLoading(true);
    message.push({ role: "user", content: input });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: message,
      // [
      //   { role: "system", content: "You are a helpful assistant." },
      //   {
      //     role: "user",
      //     content: "What is mern stack",
      //   },
      // ],
    });
    message.push(completion.choices[0].message);
    console.log(completion.choices[0].message);
    setMessage([...message]);
    setLoading(false)
    setinput("");
  };

  return (
    <>
      <main>
        <nav>
          <div className="p-3 flex justify-between">
            <div class="flex-1 text-xl ml-5 text-white">
              <img src="/Image/ChatWave.png" alt="Img" class="w-10 p-1" />
              <a href="#">ChatWave</a>
            </div>
            {user ? (
            <div className="sign-btn flex justify-center items-center ml-2 px-4 h-auto w-auto py-1 bg-[#171717] text-sm font-bold text-white rounded-3xl">
              <img src={user.photoURL} className="rounded-full w-10 h-10 mr-2" alt="User Profile" loading="lazy"/>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="sign-btn flex justify-center items-center ml-2 py-3 px-4 h-auto w-auto py-2 bg-white text-sm font-bold text-black rounded-3xl hover:bg-gray-200">
              <button>
                <Link to='/Login'>Sign in</Link>
              </button>
            </div>
          )}
          </div>
        </nav>
        <section className="logo flex flex-row justify-center w-full">
          <div className="logo-img w-20 p-3">
            <img src="/Image/ChatWave.png" />
          </div>
          <div className="logo-name text-xl text-white">ChatWave</div>
        </section>
        <section className="Main-Contain">
          <div class="flex chat-contain justify-center">
            <div class="w-full">
           

              <div className="gpt-container">
                <Chat message={message} loading={loading} />
              </div>
              <div className="input-section flex justify-center my-5">
                <MdAddLink className="add-img" size={26} color="white" />
                <input
                  type="text"
                  value={input}
                  placeholder="enter your prompt"
                  onChange={(e) => setinput(e.target.value)}
                />
                <FaArrowUp
                  className="enter-input"
                  onClick={chatOpenAi}
                  color="white"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
