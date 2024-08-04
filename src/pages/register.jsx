import { useState } from "react";
import {register} from '../services/auth'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import image from '/image1.png'
import '../index.css'

export const Register=() =>{
const[userData,setUserData]=useState({
    name: '',
    email: '',
    password: ''
})
const[loading,setLoading] = useState(false)
const navigate = useNavigate() 

const handleChange=(e)=>{
    setUserData({
        ...userData,
        [e.target.name]: e.target.value
    })
}

const handleSubmit=async(e)=>{
    e.preventDefault()
    setLoading(true)
    if(!userData.name || !userData.email || !userData.password){
        return;
    }
    try{
    const {name,email,password} = userData
    const response = await register({name,email,password})
    console.log(response)
    if(response.status === 200){
        toast.success('User registered successfully')
        navigate('/login')
    }
    }
    catch(error){
        toast.error(error.message)
    }
    finally{
        setLoading(false)
    }
}

    return(
        <div className="register flex flex-row font-sans">
            <div className="flex flex-col h-12 mt-10 " >
                <h1 className="account text-4xl ml-20 mt-20 font-extrabold">Create an account</h1>
                <p className="ml-20 mt-0">Your personal job finder is here</p>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="input1 flex flex-col gap-y-10 ml-12 mt-10 ml-20 w-full">
                        <input className="border-black-800 border-2  h-12 px-2" name="name" type="text" value={userData.name} onChange={handleChange} placeholder="Your name" />
                        <input className="border-black-800 border-2  h-12 px-2" name="email" type="email" value={userData.email} onChange={handleChange} placeholder="Email" />
                        <input className="border-black-800 border-2  h-12 px-2" name="password" type="password" value={userData.password} onChange={handleChange} placeholder="Password" />
                        <p><input type="checkbox" className="checkbox" />&nbsp;By creating an account, I agree to our terms of use and privacy policy</p>
                        <button disabled={loading} className="submit  border-orange-600 border-y-8 w-80 h-52 bg-orange-600 text-white" type="submit">Create Account</button>
                        <p>Already have an account? &nbsp;&nbsp;<a className="underline" href="/login">Sign in</a></p>
                    </div>
                </form>
            </div>
            <div className=" ml-96">
                <h1 className="absolute text-white text-5xl ml-36 mt-20">Your Personal Job Finder</h1>
                <img className="w-screen h-screen" src={image} alt="image" />
            </div>
        </div>
    )
}

