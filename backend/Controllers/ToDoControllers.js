const auth = require('../middlewares/auth');
const todo = require('../Models/ToDoSchema');
const JWT = require('jsonwebtoken')
require("dotenv").config()
const users = require('../Models/userModels')


//creating a todo
exports.createToDo = async (req, res) => {
    try {

        //collecting data from frontEnd
        const  {title}   = req.body;

        //checking if all fields are filled or not??
        if (!title) {
            throw new Error("Please filled the title")
        }

        todo.title = title;
        const newTitle = await todo.create({
            title,
        })
        console.log(newTitle)

        res.send({
            success: "Title regstrd",
            newTitle,
        })
        


    } catch (error) {
        console.log(error);
        console.log("error at exports.createToDo");
    }
}

//creating a task
exports.createTask = async (req, res) => {

    try {

        //taking id from frontend
        const toDoId = req.params.id

        console.log(toDoId);

        //taking task from body
        const { task } = req.body;

        if(task == null){
            throw new Error("Add task")
        }

        console.log(task);

        //finding by id
        const newToDoTask = await todo.findById({ _id: toDoId })
        console.log(newToDoTask);

        // newToDoTask.task.$push(task)
        newToDoTask.task.push(task)

        await newToDoTask.save()

        res.json(newToDoTask)

    } catch (error) {
        console.log(error);
        console.log("error at createTask");
    }


}

//delete a specific todo
exports.deleteToDo = async (req, res) => {

    try {

        //geting Id from frontend
        const  toDoId  = (req.params.id);
        console.log(toDoId);

        await todo.findByIdAndDelete({_id:toDoId})

        
        // const deleteId = await todo.findByIdAndDelete(req.params.id )

        res.json({
            message:"deleted todo"
        })


    } catch (error) {
        console.log(error);
        console.log("error at exports.deleteToDo");
    }

}

//deleting task
exports.deleteTask = async (req,res) => {

    try {
        
        //finding id from document 
        // const delTask = await todo.findById(req.params.id)
        // console.log(delTask);

        //taking task from frontEnd
        const {task} = req.body;
        console.log(task);

        //long way
        // // finding index of task
        // let index = await delTask.task.indexOf(task)
        // console.log(index);

        // //deleting task
        // await delTask.task.splice(index,1)

        //short way
        await todo.findByIdAndUpdate(req.params.id,{
            $pull:{
                task:task
            }
        })

        //saving task
        // await delTask.save()

        res.json({
            message:"task deleted successfully"
        })

    } catch (error) {
        console.log(error);
        console.log("error at exports.deleteTask");
    }

}


//getting all todos
exports.getToDos = async(req,res)=>{

    try {

        const allToDos = await todo.find()
        // .populate('todo')
        // const allToDos = req.allToDos
        res.json({
            
            allToDos
        })

    } catch (error) {
        console.log(error);
        console.log("error at exports.getToDos");
    }

}

//edit task
exports.editTask = async(req,res) => {
    try {
        
        const {editedTask} = req.body
        const {curTask} = req.body
        console.log(curTask);  //coming
        console.log(editedTask); //coming
        const id = req.params.id
        console.log(id)

        //udate current task to edited task
        const t = await todo.updateOne({_id:id},
            {$set:{"task.$[element]":editedTask}},
            { arrayFilters: [{ element: curTask }]})

        res.json({
            message:"updated task"
        })

    } catch (error) {
        console.log(error);
        console.log("error at editTask controller");
    }
}

//edit title
exports.editTitle = async (req,res)=>{
    try {

        //taking input from frontend
        const newTitle = req.body.title
        console.log(newTitle);
        const id = req.params.id

        const temp = await todo.findByIdAndUpdate({_id:id},{title:newTitle})
        console.log(temp)

        res.json({
            message:"updated"
        })
        
    } catch (error) {
        console.log(error)
        console.log("error at editTitle controller")
    }
}

