<<<<<<< HEAD
classMethods: {
       associate: function(models) {
           // Add the correct association and relationship
       }
=======
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wiki = sequelize.define('Wiki', {
    title: {
	type: DataTypes.STRING,
	allowNull: false
    },
    body: {
	type: DataTypes.STRING,
	allowNull: false
    },
    private: {
	type: DataTypes.BOOLEAN,
	allowNull: false,
	defaultValue: false
    }
  }, {});
  Wiki.associate = function(models) {
    // associations can be defined here
    Wiki.belongsTo(models.User, {
	foreignKey: "userId",
	onDelete: "CASCADE"
    })
  };
  return Wiki;
};
>>>>>>> wiki
