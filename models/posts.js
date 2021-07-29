'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      posts.belongsTo(models.users, {
        foreignKey: 'user_id'
      })
    }
  };
  posts.init({
    title: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        max: 255, 
        notEmpty: true, 
        notNull: true
      }
    },
    content: {
      type: DataTypes.TEXT, 
      validate: {
        max: 10000
      }
    },
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};
