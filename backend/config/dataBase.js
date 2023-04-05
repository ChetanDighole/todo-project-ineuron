require('dotenv').config()
const mongoose = require('mongoose');

const connectToDb =() =>{
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log("success to db"))
    .catch(error =>{
        console.log(error);
        console.log("error at dataBase.js");
        process.exit(1)
    })
}

module.exports = connectToDb

