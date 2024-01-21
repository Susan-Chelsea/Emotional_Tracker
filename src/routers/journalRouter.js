const express = require('express');
const journals = require('../data/journals.json');
const database = require('../utils/dbconn');

const journalRouter = express.Router();


journalRouter.route('/').get((request, response) => {
    const selectSQL = 'SELECT * FROM journal';
    database.query(selectSQL, (err, journals) => {
        if (err) {
            throw err;
        } else {
            console.log(journals);
            response.render('journals', {journals});
        }
    });
})

journalRouter.route('/add').get((request, response) => {
    response.render('add-journal');
});

journalRouter.route('/:id').get((request, response) => {
    const id = request.params.id;
    response.render('journal', {journal: journals[id]})
});

module.exports = journalRouter;