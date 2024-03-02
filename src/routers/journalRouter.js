const express = require('express');
const debug = require('debug')('app:journalRouter');
const {response} = require("express");

const journalController = require('../controllers/journalControllers');
const journalRouter = express.Router();


journalRouter.route('/add').get((request, response) => {
    response.render('add-journal');
})

journalRouter.get('/', journalController.getAllJournalsByUserid)

journalRouter.post('/add', journalController.addJournal);


journalRouter.route('/edit/:id').get((request, response) => {
    response.render('edit-journal', {journal: rows[0]});
})


journalRouter.route('/add').post((request, response) => {
    response.redirect('/journals/');
});


journalRouter.route('/update/:id').post((request, response) => {
    response.redirect(`/journals/${id}`);
});

journalRouter.route('/delete').post((request, response) => {
    response.redirect('/journals');
});

journalRouter.route('/:id').get((request, response) => {
    response.render('journal', {journal: rows[0]});
});

module.exports = journalRouter;