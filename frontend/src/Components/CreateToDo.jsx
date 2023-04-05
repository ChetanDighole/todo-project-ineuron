import React from 'react'
import axios from 'axios'
import { useState , } from 'react';


const CreateToDo = (prop) => {
    

    const [useValue, setuseValue] = useState("")

    const submitData = async () => {
        const data = {
            title: useValue
        }
        const res = await axios.post('/createToDo', data)
        console.log(res);
        setuseValue("")
        prop.onSubmit(useValue)
    }
    
    

    const handleSubmit = (event) => {
        event.preventDefault();

        submitData();
        console.log(useValue);
        console.log("done");
    }

    
    

    return (
        
            <div className="flex flex-col items-center gap-4 py-4">
                <h1 className="text-4xl font-black text-center">TODO</h1>
                <div className="flex flex-col items-center gap-4 py-2">

                    <label>
                        <input type="text" name="name" className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Add title"
                            value={useValue}
                            onChange={(event) => setuseValue(event.target.value)}
                        />
                    </label>

                    <button onClick={handleSubmit} className="w-[250px] bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                        Click to add todo
                    </button>

                </div>
            </div>
        
    )
}

export default CreateToDo