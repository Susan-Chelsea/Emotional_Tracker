const express = require('express');
const debug = require('debug')('app');
const database = require('../utils/dbconn');

const adminRouter = express.Router();

adminRouter.route('/').get((request, response) => {
  
  database.query('SELECT * FROM journal', (err, users) => {
        if (err) throw err
        
        response.send(users);
      });
    
    
      database.end();
})

module.exports = adminRouter;