const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.get('/', authController.index);

authRouter.get('/register', authController.registrationPage);

authRouter.get('/logout', authController.logout);

authRouter.post('/login', authController.login);

authRouter.post('/register', authController.register);

module.exports = authRouter;