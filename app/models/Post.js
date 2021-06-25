'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User,{as:"author",foreignKey:"userId"})
    }
  };
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Post',
    tableName:'posts'
  });
  return Post;
};