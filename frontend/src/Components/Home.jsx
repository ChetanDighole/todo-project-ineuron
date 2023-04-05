// import React, { useEffect } from 'react'
import { useState } from 'react';
import AllToDos from './AllToDos';
import CreateToDo from './CreateToDo';
// import { useNavigate } from 'react-router-dom';

function Home() {

    // const [cookieExist, setCookieExist] = useState("")

    // const navigate = useNavigate()

    // async function getCookie() {
    //     const cookieValue = await document.cookie
    //     .split('; ')
    //     .find((row) => row.startsWith('token='))?.split('=')[1];
        
    //     setCookieExist(cookieValue)
    //     return cookieValue
    // }

    // useEffect(()=>{
    //     getCookie()
    // } , [])

    const [data, setdata] = useState(null)

    return (
        <>
            <CreateToDo onSubmit={setdata} />
            <AllToDos getData={data} />
        </>
    )
}

export default Home