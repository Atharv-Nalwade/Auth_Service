const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const UserRepository= require('../src/repository/user-repository');


const app = express();

const prepareAndStartServer = async () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    app.use('/api',apiRoutes);

    const user= new UserRepository();
    const x= await user.getById(3);
    console.log(x);    

    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);
    });
}   

prepareAndStartServer();