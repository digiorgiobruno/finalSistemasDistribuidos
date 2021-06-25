'use strict';
const {
  User
} = require('../../models/index');
const bcryp = require('bcrypt');
const authConfig = require('../../../config/auth')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all(
      [
        User.create({
          name: "Bruno",
          email: "digiorgiobruno92@gmail.com",
          password: bcryp.hashSync("123456", Number.parseInt(authConfig.rounds)),
          posts: [{
              title: "Titulo 1",
              body: "Cuerpo 1"
            },
            {
              title: "Titulo 2",
              body: "Cuerpo 2"
            },
            {
              title: "Titulo 3",
              body: "Cuerpo 3"
            },
            {
              title: "Titulo 4",
              body: "Cuerpo 4"
            }
          ]
        }, {
          include: "posts"
        }),
        User.create({
          name: "Franco",
          email: "digiorgiofranco33@gmail.com",
          password: bcryp.hashSync("123456", Number.parseInt(authConfig.rounds)),
          posts: [{
              title: "Titulo 5",
              body: "Cuerpo 5"
            },
            {
              title: "Titulo 6",
              body: "Cuerpo 6"
            },
            {
              title: "Titulo 7",
              body: "Cuerpo 7"
            },
            {
              title: "Titulo 8",
              body: "Cuerpo 8"
            }
          ]
        }, {
          include: "posts"
        })


      ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulDelete('posts',null,{}),
      queryInterface.bulDelete('users',null,{})
    ])
  }
};