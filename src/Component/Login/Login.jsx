import React from 'react'
import './Login.css';
import { auth, provider } from '../FirebaseConfig';
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react'

function Login() {
    const [user, setUser] = useState(null);

    const signInWithGoogle = async () => {
        try {    
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            window.location.assign("/")
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };
    return (
        <>
        <div className='login bg-white pt-[8%]'>
            <div className='upper flex flex-col'>
                <div className='heading text-center items-center flex justify-center'>
                    <img src="/Image/ChatWave.png" alt="Img" class="w-20 p-1"/>
                    <h1 className='text-3xl text-black bg-white '>Welcome back</h1>
                </div>
                <div className='bg-white text-center justify-center pt-[25px]'>
                    <input type='text' placeholder='Email address or phone number*' className='bg-white border-2 border-custom-green w-[330px] h-[50px]'></input>
                </div>
                <div className='bg-white text-center justify-center pt-[25px]'>
                    <button className='text-white bg-[#10A37F] w-[330px] h-[50px] rounded-md'>Continue</button>
                </div>
                <div className='bg-white text-center justify-center pt-[25px]'>
                    <p>Don't have an account? <span className='text-[#10A37F] hover:underline cursor-pointer'> Sign Up</span></p>
                </div>
                <div className='bg-white justify-center text-center pt-[25px]'>
                    <p>OR</p>
                </div>
            </div>
            <div className='lower bg-white pt-[25px]'>
                <div className='bg-white flex pt-[12px] pl-[10px] border-2 border-custom-green w-[330px] ml-[520px] h-[50px] cursor-pointer'>
                    <div className='bg-white'><img src='./public/Image/google.svg' className='object-fit:contain w-[20px] h-[20px]'></img></div>
                    <div className='bg-white'><p onClick={signInWithGoogle}>Continue with Google</p></div>
                </div>
                <div className='bg-white flex pl-[10px] pt-[12px] mt-[25px] border-2 border-custom-green w-[330px] ml-[520px] h-[50px] cursor-pointer'>
                    <div className='bg-white'><img src='./public/Image/microsoft.svg' className='object-fit:contain w-[20px] h-[20px]'></img></div>
                    <div className='bg-white'><p onClick={signInWithGoogle}>Continue with Microsoft Account</p></div>
                </div>
                <div className='bg-white flex pl-[10px] pt-[12px] mt-[25px] border-2 border-custom-green w-[330px] ml-[520px] h-[50px] cursor-pointer'>
                    <div className='bg-white'><img src='./public/Image/apple.svg' className='object-fit:contain w-[20px] h-[20px]'></img></div>
                    <div className='bg-white'><p onClick={signInWithGoogle}>Continue with Apple</p></div>
                </div>
                <div className='bg-white text-center justify-center pt-[25px]'>
                    <p className='text-[#10A37F]'>Terms of Use | Privacy Policy</p>
                </div>
            </div>
        </div>
        </>
    )   
}

export default Login