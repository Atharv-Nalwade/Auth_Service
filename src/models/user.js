'use strict';
const {
  Model
} = require('sequelize');

//Require Bcrypt
const bcrypt = require('bcrypt');

// Import SALT 
const { SALT } = require('../config/serverConfig');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail:true
      }
    } ,
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,30] // Length of pwd should be between 3 to 30
      }
    } 
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate( (user) => {
    const encryptedPassword = bcrypt.hashSync(user.password,SALT);
    user.password = encryptedPassword; // here we write user instead of User as the argumnet is user and that is the row that will be added 
  })
  

  return User;
};