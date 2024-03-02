const express = require('express');
const debug = require('debug')('app:adminRouter');

const adminRouter = express.Router();

adminRouter.route('/').get((request, response) => {})

module.exports = adminRouter;