const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req,res) =>{
    try {
        const response = await userService.create({
            password:req.body.password,
            email:req.body.email
        })
        return res.status(201).json({
            data:response,
            success:true,
            message:"Succesfuly created a new user",
            err:{}
        })
    } catch (error) {
       console.log(error);
       return res.status(500).json({
        message:"Something went wrong",
        data:{},
        success:false,
        err:error
       })
    }
}

const signIn = async (req,res) =>{
    try {
        const response = await userService.signIn(req.body.email,req.body.password);

        return res.status(200).json({
            data:response,
            success:true,
            message:"Succesfuly signed in",
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
         message:"Something went wrong",
         data:{},
         success:false,
         err:error
        })
    }
}

// To check if the incoming frotend req is authenticated request or not 
const isAuthenticated = async (req,res) =>{
    try {
       const token = req.headers['x-access-token'];   // x-access-token is the name of the key with which we send out token from headers 
       const response = userService.isAuthenticated(token);
       return res.status(200).json({
        success:true,
        err:{},
        data : response ,
        message: "User is Authenticated and token is valid"
       })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
         message:"Something went wrong",
         data:{},
         success:false,
         err:error
        })
    }
}

const isAdmin = async (req,res) =>{
    try {
        const response = await userService.isAdmin(req.body.id);

        return res.status(200).json({
            data:response,
            success:true,
            message:"Succesfuly fetched wether user is Admin or not",
            err:{}
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
         message:"Something went wrong",
         data:{},
         success:false,
         err:error
        })
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}