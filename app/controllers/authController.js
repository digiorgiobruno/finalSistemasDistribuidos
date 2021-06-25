const {
    User
} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    password
} = require('../../config/database');
const authConfig = require('../../config/auth');
const auth = require('../../config/auth');
module.exports = {
    //login
    signIn(req, res) {
        let {
            email,
            password
        } = req.body;
        //Buscar usuario
        User.findOne({
            where: {
                email: email
            }
        }).then(
            user => {
                if (!user) {
                    res.status(404).json(err);
                } else {
                    if (bcrypt.compareSync(password, user.password)) {
                        //Devolvemos token
                        //se crea el token una vez creado el usuario
                        let token = jwt.sign({
                                user: user
                            },
                            authConfig.secret, {
                                expiresIn: authConfig.expires
                            }
                        );
                        res.json({
                            user: user,
                            token: token
                        });
                    } else {
                        //Acceso no autorizado
                        res.status(401).json({
                            msg: "Contraseña incorrecta"
                        });
                    }
                }
            }
        ).catch(err => {
            res.status(500).json({
                msg: "Usuario inexistente"
            });
        });
    },
    //Registro
    signUp(req, res) {
        //se encripta la contraseña usando la libreria bcrypt
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
        //Crear un usuario
        console.log('------Nombre' + req.body.name);
        console.log('------Correo' + req.body.email);
        console.log('------Contraseña', password);
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        }).then(user => {
            //se crea el token una vez creado el usuario
            let token = jwt.sign({
                    user: user
                },
                authConfig.secret, {
                    expiresIn: authConfig.expires
                }
            );
            res.json({
                user: user,
                token: token
            });
        }).catch(err => {
            res.status(500).json(err);
        });
    }
}