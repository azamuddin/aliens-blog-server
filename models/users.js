'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  users.init({
    name: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        min: 5, 
        max: 500
      }
    },
    email: {
      type: DataTypes.STRING, 
      unique: true, 
      allowNull: false,
      validate: {
        isEmail: true, 
        notEmpty: true, 
        notNull: true, 
        max: 255
      }
    },
    password:{
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        max: 500
      }
    } 
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
