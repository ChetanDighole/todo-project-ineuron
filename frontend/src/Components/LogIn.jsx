import React from 'react'
import axios from 'axios'
// import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Home from './Home'

function LogIn() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const navigate = useNavigate()

    const homeRoute = async(e) =>{

        e.preventDefault()
        const data = {
            email: email,
            password: password
        }

        const user = await axios.post('/logIn' , data)
        console.log(user);

        if(!user){
            navigate('/logIn')
        }
        navigate('/home')
        

    }



  return (
    <div>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="max-w-[95%] w-full p-6 m-auto bg-white rounded-md  ring-2 ring-indigo-600 lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
                        Sign In
                    </h1>
                    <form className="mt-6 logInForm" onSubmit={homeRoute}>
                        
                        <div className="mb-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email" autoComplete='off' name='email'
                                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(event)=>setemail(event.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password" name='password'
                                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(event)=>setpassword(event.target.value)}
                            />
                        </div>
                        <div className="mt-6">
                            <button type='submit'
                            
                            className="w-full px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 border-b-4 border-indigo-800 hover:border-indigo-600 rounded">
                                Sign In
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-xs font-light text-center text-gray-700">
                        {" "}
                        Don't have an account?{" "}
                        <a
                            onClick={()=>{
                                navigate('/signUp')
                            }}
                            className="font-medium cursor-pointer text-indigo-600 hover:underline"
                        >
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
  )
}

export default LogIn