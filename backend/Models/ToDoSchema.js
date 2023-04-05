const mongoose = require('mongoose');
const users = require('./userModels')

const todoSchema = new mongoose.Schema({
    users:{
        type:mongoose.Types.ObjectId,
        ref: 'users'
    },
    title:{
        type: String,
    },
    task:{
        type:[String],
        
    },

},{
    timestamps:true,
})


module.exports = mongoose.model('todo' , todoSchema)