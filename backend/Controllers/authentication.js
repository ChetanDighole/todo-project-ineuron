const users = require('../Models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const auth = require("../middlewares/auth")


exports.signUp = async (req, res) => {
    try {

        //collecting data from frontEnd
        const { name, email, password } = req.body;

        //chack all data is present or not?
        if (!(name && email && password)) {
            throw new Error("all fields necessory")
        }

        //checking if user already exist or not
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            throw new Error("User already exists!!!")

        }

        //password is encrypted here
        const encruptedPassword = await bcrypt.hash(password, 10)

        //creating a new data for new user
        const newUser = await users.create({
            name,
            email: email,
            password: encruptedPassword,
        })

        //token is created here
        const token = jwt.sign({ id: newUser._id, email }, process.env.tokenSecreteKey, { expiresIn: '4h' })

        newUser.token = token;
        //don't want to send password to frontend
        newUser.password = undefined;

        res.json(newUser)



    } catch (error) {
        console.log(error);
        console.log("error in signUp");
    }
}

exports.logIn = async (req, res) => {
    try {
        //collecting data from frontEnd
        const { email, password } = req.body;

        //checking if all the field are filled or not?
        if (!(email && password)) {
            throw new Error("All fields are necessary")
        }

        //check if user exists?
        const existingUser = await users.findOne({ email })

        //validate password
        if (existingUser && (await bcrypt.compare(password, existingUser.password))) {

            const token = await jwt.sign({ id: existingUser._id, email }, process.env.tokenSecreteKey, { expiresIn: '4h' })

            existingUser.token = token;
            existingUser.password = undefined;

            const option = {
                expire: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.status(201).cookie("token", token, option).json({
                success: true,
                token,
                existingUser
            })
        }
        throw new Error("Email or Password are inncorrect")
    } catch (error) {
        console.log(error);
        console.log("login error");
    }

}

// exports.home = (req, res) => {
//     res.send("welcome to home screen")
// }
