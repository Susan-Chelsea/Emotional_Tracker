const express = require('express');
const debug = require('debug')('app:authRouter');
const database = require('../utils/dbconn');

const authRouter = express.Router();

authRouter.route('/register').post((request, response) => {
    response.send(request.body)
});

module.exports = authRouter;