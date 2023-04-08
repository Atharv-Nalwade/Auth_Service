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

module.exports = {
    create,
    signIn
}