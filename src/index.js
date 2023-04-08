const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const app = express();

// const UserService= require('../src/services/user-service')

const prepareAndStartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // const userService = new UserService();
//    const x= userService.createToken({"email":"atharv@Admin.com","password":"123"});
//     console.log(x);
    //  const  y = userService.verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF0aGFydkBBZG1pbi5jb20iLCJwYXNzd29yZCI6IjEyMyIsImlhdCI6MTY4MDI1OTg3MywiZXhwIjoxNjgwMjYzNDczfQ.riz3ej750txaTmIYMf821K2PXf3NIH_9u02FuoCY5i4");
    //  console.log(y); 
   
    app.use('/api',apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);
    });
}   

prepareAndStartServer();