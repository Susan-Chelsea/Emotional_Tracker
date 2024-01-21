const express = require('express');
const debug = require('debug')('app:journalRouter');
const database = require('../utils/dbconn');
const {response} = require("express");

const journalRouter = express.Router();


journalRouter.route('/').get((request, response) => {
    const selectSQL = 'SELECT * FROM journal';
    database.query(selectSQL, (err, journals) => {
        if (err) {
            throw err;
        } else {
            response.render('journals', {journals});
        }
    });
})

journalRouter.route('/add').get((request, response) => {
    response.render('add-journal');
})

journalRouter.route('/edit/:id').get((request, response) => {
    console.log('getting edit')
    const id = request.params.id;

    const selectSQL = `SELECT * FROM journal where journal_id = ${id}`;

    database.query(selectSQL, (err, rows) => {
        if (err) {
            throw err;
        } else {
            response.render('edit-journal', {journal: rows[0]});
        }
    });
})


journalRouter.route('/add').post((request, response) => {
    const journal = Object.values(request.body).map(value => value);

    const insertSql =
        "INSERT INTO journal " +
        "(user_id, title, anger, contempt, disgust, enjoyment, fear, sadness, surprise, trigger_reason, datetime, notes)" +
        " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    database.query(insertSql, journal, (err, result) => {
        if (err) {
            throw err;
        } else {
            response.redirect('/journals/');
        }
    });
});

journalRouter.route('/delete').post((request, response) => {
    const id = request.body.journalId;

    const sql = `DELETE FROM journal WHERE journal_id = ${id}`;

    database.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log("Number of records deleted: " + result.affectedRows);
            response.redirect('/journals');
        }
    });
});

journalRouter.route('/:id').get((request, response) => {
    const id = request.params.id;

    const selectSQL = `SELECT * FROM journal WHERE journal_id = ${id}` ;
    database.query(selectSQL, (err, rows) => {
        if (err) {
            throw err;
        } else {
            response.render('journal', {journal: rows[0]});
        }
    });
});

module.exports = journalRouter;