const jwt = require('jsonwebtoken');
require("dotenv").config()

const auth = async (req,res,next) =>{

    const {token} =  req.cookies;

    if(!token){
        throw new Error("cookie not present")
    }


    try {
        
        const verify = await jwt.verify(token , process.env.tokenSecreteKey)
        console.log(verify);
        req.user = verify //req.user is created by us we can also write req.chetan......

    } catch (error) {
        console.log(error);
        throw new Error("token invalid")
    }
    return next();

}

module.exports = auth
