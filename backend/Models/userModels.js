const mongoose = require('mongoose');
const todo = require('./ToDoSchema.js')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:[true,"Name required"]
    },
    email:{
        type:String,
        unique: true,
        // required:[true , "Email require"]
    },
    password:{
        type:String
    },
    token:{
        type:String
    },
    // todo: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'todo'
    // }
})

module.exports = mongoose.model('users',userSchema)
