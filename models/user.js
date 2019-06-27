'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    },
    password_digest: DataTypes.STRING,
    api_key: DataTypes.STRING
  }, {
    // classMethods: {
    //   create_from_post: async function(email, password, confirm_password){
    //     if ( password != confirm_password){
    //       throw new Error('passwords do not match')
    //     }
    //     let api_key = Math.random().toString(36).substring(2)
    //
    //     bcrypt.hash(password, 5, function(err, hash) {
    //         this.create(
    //           {email: email, password_digest: hash, api_key: api_key}
    //         )
    //     });
    //
    //   }
    // }
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};
