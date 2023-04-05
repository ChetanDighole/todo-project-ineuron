const { signUp, logIn } = require('../Controllers/authentication');
const express = require('express');
const routes = express.Router();
const auth = require("../middlewares/auth");
const { createToDo, createTask, deleteToDo, deleteTask, home, getToDos, editTask, editTitle } = require('../Controllers/ToDoControllers');


routes.post('/signUp' , signUp)
routes.post('/logIn' , logIn)
routes.post('/createToDo' , createToDo )  //done
routes.post('/createTask/:id' , createTask )  //done
routes.delete('/deleteToDo/:id' , deleteToDo)  //done
routes.put('/deleteTask/:id' , deleteTask) //done
routes.get('/getToDos' , getToDos)  //done
routes.put('/editTask/:id' , editTask) //done
routes.put('/editTitle/:id' , editTitle) //done



module.exports = routes

