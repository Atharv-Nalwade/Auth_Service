const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require ('../repository/user-repository');

const { JWT_KEY } = require('../config/serverConfig');

class UserService{
    constructor(){
        this.userRepository= new UserRepository();
    }

    async create ( data ){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw(error);
        }
    }

    async signIn(email, plainPassword){
        try {
            // 1 -> fetch the user by email
            const user = await this.userRepository.getByEmail(email);
            //2 -> Compare incoming plain pwd with stored encrypted pwd
            const encryptedpwd = user.password; // var to extrcat encrypted pwd from user obj
            const passwordMatch = this.checkPassword(plainPassword,encryptedpwd);

            if(!passwordMatch){
                console.log("Passwords do not match");
                throw { error:"Incorrect Password"}
            }

            // 3-> If pwd match create a token and send it to the user
            const newJWT = this.createToken({ email: user.email , id: user.id });
            return newJWT;
            
        } catch (error) {
            console.log("Something went wrong in sign up process", error);
            throw(error)
        }
    }

     createToken(user){                           // --> This is a normal function 
        try {
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
            return result;
        } catch (error) {
            console.log("Something went wrong in token creation");
            throw(error);
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw(error);
        }
    }

    checkPassword(userInputPlainPassword , encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in password comparison", error);
            throw(error);
        }
    }
}

module.exports = UserService ;