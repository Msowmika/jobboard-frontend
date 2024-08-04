import { useState } from "react";
import { login } from "../services/auth";
import toast from "react-hot-toast";
import image from '/image1.png'

export const Login=() =>{
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.email || !userData.password) {
            return;
        }
        try {
            const { email, password } = userData;
            const response = await login({ email, password })
            console.log(response);
            if (response.status === 200) {
                const { data } = response;
                localStorage.setItem('token', data.token);
                toast.success('User logged in successfully');
            }
        }
        catch (error) {
           toast.error(error.message);
        }
    }
    return (
        <div className="register flex flex-row font-sans">
            <div className="flex flex-col h-12 mt-10 " >
            <h1 className="account text-4xl ml-20 mt-20 font-extrabold flex-inline">Already have an account?</h1>
            <p className="ml-20 mt-0">Your personal job finder is here</p>
            <form onSubmit={handleSubmit}>
            <div  className="input1 flex flex-col gap-y-10 ml-12 mt-10 ml-20 w-full">
                <input className="border-black-800 border-2  h-12 px-2" name="email" value={userData.email} onChange={handleChange} type="email" placeholder="Your email" />
                <input className="border-black-800 border-2  h-12 px-2" name="password" value={userData.password} onChange={handleChange} type="password" placeholder="Your password" />
                <button className="submit  border-orange-600 border-y-8 w-80 h-52 bg-orange-600 text-white" type="submit">Sign in</button>
                <p>Don’t have an account?&nbsp;&nbsp;<a className="underline" href="/register">Sign up</a></p>
            </div>    
            </form>
            </div>
            <div className=" ml-96">
                    <h1 className="absolute text-white text-5xl ml-36 mt-20">Your Personal Job Finder</h1>
                    <img className="w-screen h-screen" src={image} alt="image" />
            </div>
        </div>
    );
}