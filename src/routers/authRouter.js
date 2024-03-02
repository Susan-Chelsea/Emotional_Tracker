const express = require('express');
const debug = require('debug')('app:authRouter');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/login', authController.login);

module.exports = authRouter;