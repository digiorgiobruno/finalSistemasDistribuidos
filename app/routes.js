const express = require('express');
const authController = require('./controllers/authController');
const router = express.Router();
//Middlewares
const auth = require('../app/middlewares/auth');
//Controllers
const AuthController= require('./controllers/authController');
const PostController= require('./controllers/postController');
router.get('/', (req, res) => {
    res.json({
        hello: "World"
    });
})
// Dos rutas: login y registro
// /api/signin & /api/signup
router.post('/api/signin',authController.signIn);
router.post('/api/signup',authController.signUp);

// Rutas posts protegida
router.get('/api/posts', auth, PostController.index);
router.get('/api/posts/:id', auth, PostController.show);
router.patch('/api/posts/:id', auth, PostController.update);
router.delete('/api/posts/:id', auth, PostController.delete);

module.exports = router;
