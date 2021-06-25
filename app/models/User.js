'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        as: "posts",
        foreignKey: "userId"
      });
      User.belongsToMany(models.Role, {
        as: "roles",
        through: "user_role",
        foreignKey: "user_id"
      });
    }
  };

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El nombre solo puede contener letras"
        },
        len: {
          args: [2, 255],
          msg: "El nomnbre contener minimamente 2 caracteres y 255 como máximo"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {

        len: {
          args: [6, 255],
          msg: "Este campo debe contener minimamente 6 caracteres y 255 como máximo"
        }
      }

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Formato de correo no valido"
        },
        len: {
          args: [2, 255],
          msg: "este campo debe contener minimamente 2 caracteres y 255 como máximo"
        }
      }

    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });

  // Comprueba que el usuario es administrador
  User.isAdmin = function (roles) {
    let tmpArray = [];
    roles.forEach(role => tmpArray.push(role.role));//obtenemos un arrayTemporal con todos los roles
    console.log(tmpArray);
    return tmpArray.includes('admin');//si este array incluye 'admin' devuelve true sino falso
  }

  return User;
};