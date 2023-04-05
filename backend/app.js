const express = require('express');
const userRoutes = require('./Routes/userRoutes')
const connectToDb = require('./config/dataBase');
const cookieParser = require('cookie-parser')
const cors = require('cors')


connectToDb()

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use('/' , userRoutes )


module.exports = app;