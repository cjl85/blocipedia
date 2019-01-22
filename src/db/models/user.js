'use strict';

module.exports = (sequelize, DataTypes) => {

  let length = {length: 3};
   let email = {isEmail: true};

  let User = sequelize.define('User', {
    username: {
	      type: DataTypes.STRING,
	 allowNull: false,
    validate: length
    },
    password: {
	      type: DataTypes.STRING,
 	 allowNull: false
    validate: length
    },
    email: {
	     type: DataTypes.STRING,
	allowNull: false,
	 validate: email
    },
    role: {
       type: DataTypes.STRING,
  allowNull: false,
  defaultValue: "standard"
    },
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Wiki, {
      foreignKey: "userId",
              as: "wikis"
    })
  };
  return User;
};
