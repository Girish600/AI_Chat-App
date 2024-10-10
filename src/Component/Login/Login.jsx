import React from 'react'
import './Login.css';
import { auth, provider } from '../FirebaseConfig';
import { useState } from 'react'
import { signInWithPopup, GithubAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const [user, setUser] = useState(null);
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signInWithGoogle = async () => {
        try {    
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            window.location.assign("/")
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };
    const signInWithGithub = async () => {
        try {
          
            const githubProvider = new GithubAuthProvider(); 
            const result = await signInWithPopup(auth, githubProvider); 
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("GitHub sign-in successful:", user);
            setUser(user);
            window.location.assign("/");
        } catch (error) {
            console.error("Error signing in with GitHub", error.message);
        }
    };
    const signInWithEmail = async () => {
        try{
            await signInWithEmailAndPassword(auth, Email,password);
            window.location.assign("/");
        }
        catch(error){
            console.log(error);
        }
    };
    const CreateWithEmail = async () => {
        try{
            await createUserWithEmailAndPassword(auth, Email,password);
            window.location.assign("/");
        }
        catch(error){
            console.log(error);
            signInWithEmail();
        }
    };
    return (
        <>
        <div className='login flex flex-col justify-center items-center w-full h-[100vh] bg-white pt-[8%]'>
            <div className='upper flex flex-col'>
                <div className='heading text-center items-center flex justify-center'>
                    <img src="/Image/ChatWave.png" alt="Img" class="w-20 p-1"/>
                    <h1 className='text-3xl text-black bg-white '>Welcome back</h1>
                </div>
                <div className='bg-white text-center justify-center pt-[25px]'>
                    <input type='email' placeholder='Email address or phone number*' onChange={(ele)=>setEmail(ele.target.value)} className='bg-white border-2 p-1 border-custom-green w-[330px] h-[50px]'></input>
                </div>
                <div className='bg-white text-center justify-center pt-[25px]'>
                    <input type='Password' placeholder='enter your password' onChange={(ele)=>setPassword(ele.target.value)} className='bg-white border-2 p-1 border-custom-green w-[330px] h-[50px]'></input>
                </div>
                <div className='bg-white text-center justify-center pt-[25px]'>
                    <button type='submit' onClick={CreateWithEmail} className='text-white bg-[#10A37F] w-[330px] h-[50px] rounded-md'>Continue</button>
                </div>
                <div className='bg-white text-center justify-center pt-[25px]'>
                    <p>Don't have an account? <span className='text-[#10A37F] hover:underline cursor-pointer'> Sign Up</span></p>
                </div>
                <div className='bg-white justify-center text-center pt-[25px]'>
                    <p>OR</p>
                </div>
            </div>
            <div className='lower flex flex-col w-full items-center bg-white pt-[25px]'>
                <div className='bg-white flex gap-3 justify-center pt-[12px] pl-[10px] border-2 border-custom-green w-[330px]  h-[50px] cursor-pointer'>
                    <div className='bg-white'><img src='./Image/google.svg' className='object-fit:contain w-[20px] h-[20px]'></img></div>
                    <div className='bg-white'><p onClick={signInWithGoogle}>Continue with Google</p></div>
                </div>
                <div className='bg-white flex gap-3 pl-[10px] justify-center pt-[12px] mt-[25px] border-2 border-custom-green w-[330px] h-[50px] cursor-pointer'>
                    <div className='bg-white'><img src='./Image/download.png' className='object-fit:contain w-[20px] h-[20px]'></img></div>
                    <div className='bg-white'><p onClick={signInWithGithub}>Continue with GitHub Account</p></div>
                </div>
                <div className='bg-white flex gap-3 pl-[10px] justify-center pt-[12px] mt-[25px] border-2 border-custom-green w-[330px] h-[50px] cursor-pointer'>
                    <div className='bg-white'><img src='./Image/apple.svg' className='object-fit:contain w-[20px] h-[20px]'></img></div>
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