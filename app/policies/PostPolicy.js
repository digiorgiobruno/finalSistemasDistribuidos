const { User } = require('../models/index');

module.exports = {

    show(req, res, next) {
        if(req.user.id === req.post.userId || User.isAdmin(req.user.roles)) {
            next();
        } else {
            res.status(401).json({ msg: "No estás autorizado para ver esta pulicación" });
        }
    },

    update(req, res, next) {
        if(req.user.id === req.post.userId  || User.isAdmin(req.user.roles)) {
            next();
        } else {
            res.status(401).json({ msg: "No estás autorizado para actualizar esta pulicación" });
        }
    },

    delete(req, res, next) {
        if(req.user.id === req.post.userId  || User.isAdmin(req.user.roles)) {
            next();
        } else {
            res.status(401).json({ msg: "No estás autorizado para borrar esta pulicación" });
        }
    }

}