const { User } = require('../models/index');

class UserRepository{

    async create (data){
          try {
             const user = await User.create(data);
             return user;
          } catch (error) {
             console.log("Something went wrong in repositry layer");
             throw(error);
          }
    }

    async destroy(userId) {
        await User.destroy({
            where:{
                id:userId
            }
        });
        return true;
    }

}

module.exports = UserRepository;