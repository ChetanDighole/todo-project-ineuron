import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp() {

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const navigate = useNavigate()

    const signUpForm = async(e) => {
        e.preventDefault();


        const data = {
            name: name,
            email: email,
            password: password
        }

        console.log(data);
        const user = await axios.post('/signUp', data)
        if(!user){
            navigate('/signUp')
        }
        navigate('/logIn')

    }

    return (
        <div>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="max-w-[95%] w-full p-6 m-auto bg-white rounded-md  ring-2 ring-indigo-600 lg:max-w-xl">
                    <h1 className="text-3xl font-semibold text-center text-indigo-700 underline uppercase decoration-wavy">
                        Sign UP
                    </h1>
                    <form className="mt-6"  onSubmit={signUpForm}>
                        <div className="mb-2">
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Name
                            </label>
                            <input
                                type="text" autoComplete='off' name='name'
                                className="block w-full px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(event)=>setname(event.target.value)}
                            />
                        </div>
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
                            <button type='submit' className="w-full px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 border-b-4 border-indigo-800 hover:border-indigo-600 rounded">
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-xs font-light text-center text-gray-700" >
                        {" "}
                        Already have an account?{" "}
                        <a
                            // href="/logIn"
                            onClick={()=>{
                                navigate('/logIn')
                            }}
                            className="font-medium cursor-pointer text-indigo-600 hover:underline"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp