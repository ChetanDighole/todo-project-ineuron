import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';


function AllToDos(prop) {

  const [todos, setTodos] = useState("")
  const [del, setdel] = useState("")
  const [edtTitle,setedtTile] = useState("")
  // const [task, setTask] = useState([])
  const [task, setTask] = useState("")
  const [delCurTask, setDelCurTask] = useState("")
  const [editTasks, setEditTasks] = useState("")


  /***************************************************************************************************
   * @GET_ALL_TODOS
   * @description fetching all todos from database
  ****************************************************************************************************/

  const fetchToDos = async () => {
    const resp = await axios.get('/getToDos')

    if (resp.data.allToDos.length > 0) {
      setTodos(resp.data.allToDos)
    }
  }

  /****************************************************************************************************
  * @DELETE_TODO
  * @description deleting a TODO
  *****************************************************************************************************/

  const deleteToDo = async (e) => {
    setdel(await axios.delete(`/deleteToDo/${e}`))
  }


  /****************************************************************************************************
  * @CREATE_NEW_TASK
  * @description create a new task in desired todo
  *****************************************************************************************************/

  const createNewTask = async (e,i) => {

    const dataTask = {
      task: task
      
    }
    
    setTask(await axios.post(`/createTask/${e}`, dataTask))
    setTask("")
    
    
    

  }

  /****************************************************************************************************
  * @DELETE_TASK
  * @description deleting a specific task
  *****************************************************************************************************/

  const deleteCurrentTask = async (e, task) => {
    const val = Object.values(task)
    const data = {
      task: val[0]
    }
    setDelCurTask(await axios.put(`/deleteTask/${e}`, data))
  }

  /****************************************************************************************************
  * @EDIT_TASK
  * @description edit a task
  *****************************************************************************************************/

  const editTaskFunc = async(e_id,curTask) =>{
    console.log(e_id)
    console.log(curTask);
    const cur = Object.values(curTask)
    console.log(cur[0])


    const editedTask = prompt("Edit the task")
    console.log(editedTask);

    const data = {
      curTask:cur[0],
      editedTask
    }
    
    
    if(!editedTask){
      alert("Please enter valid task")
    }else{
      
      setEditTasks( await axios.put(`/editTask/${e_id}/`,data))
    }
    console.log(editedTask);

  }

  /*******************************************************************************************************
  * @EDIT_TITLE
  * @description edit a title
  ********************************************************************************************************/

  const editTitle = async(e_id)=>{
    const val= prompt("Enter todo")
    console.log(val);

    if(!val){
      alert("Please enter valid todo")
    }

    const data={
      title:val
    }

    setedtTile( await axios.put(`/editTitle/${e_id}`,data) )

  }


  /**********************************************************************************************************
   * @@useEffect_Hook
   *********************************************************************************************************/

  useEffect(() => {
    fetchToDos()

  }, [del, task, delCurTask , editTasks , edtTitle , prop])


  return (
    <div className="flex w-[100vw] flex-wrap justify-center items-center gap-4 py-4">
      {todos && todos.map((temp,i) => (
        <div className='flex flex-col border-2 border-sky-500 py-2 px-4 font-bold rounded-lg gap-4' key={i}>
          <div className='flex justify-between gap-4'>
            <h1 className='text-2xl'>{temp.title}</h1>

            <div className='flex item-center gap-3'>
              <button className='bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 border-b-4 border-green-800 hover:border-green-800 rounded' 
              onClick={()=>editTitle(temp._id)}
              >Edit Title</button>

              <button className='bg-rose-600 hover:bg-rose-700 text-white font-bold py-1 px-2 border-b-4 border-rose-800 hover:border-rose-800 rounded' onClick={() => deleteToDo(temp._id)}>Delete</button>
            </div>
          </div>

          {/*------------------------------------- adding all task------------------------------- */}
          <div className='flex item-center gap-4'>
            <label>
              <input type="text" className="px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Add Task"
              value={task}
              onChange={(event)=>(setTask(event.target.value))}

                // value={task[i]}
                // onChange={(event) => {
                //   task[i]= event.target.value
                //   setTask(task)}}

              />
            </label>
            <button className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 border-b-4 border-blue-800 hover:border-blue-800 rounded'
              onClick={() => createNewTask(temp._id,i)}>Add Task</button>
          </div>

          {/*-------------------------------- displaying task ----------------------------------------*/}


          {temp.task && temp.task.map((iterate, index) => (
            <div className='flex justify-between'>
              <h1>{index + 1}. {iterate}</h1>
              <div className='flex item-center gap-3'>
                {/* -------------------------------edit task---------------------------------------- */}
                <button className="text-green-600 hover:text-green-700" onClick={()=>editTaskFunc(temp._id,{iterate})}>Edit</button>
                {/* -------------------------------delete task---------------------------------------- */}
                <button className="text-red-600 hover:text-red-700" onClick={() => deleteCurrentTask(temp._id, { iterate })} >Delete</button>
              </div>
            </div>

          ))}

        </div>
        
      ))}
    </div>
  )
}

export default AllToDos