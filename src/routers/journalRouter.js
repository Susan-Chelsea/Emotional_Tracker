const express = require('express');
const authMiddleware = require('../middleware/auth');

const journalController = require('../controllers/journalControllers');
const journalRouter = express.Router();


journalRouter.get('/', authMiddleware.isAuthenticated, journalController.getAllJournalsByUserid);
journalRouter.get('/add', authMiddleware.isAuthenticated, journalController.addNewJournal);
journalRouter.get('/edit/:id', authMiddleware.isAuthenticated, journalController.editJournal);
journalRouter.get('/:id', authMiddleware.isAuthenticated, journalController.getJournalById);

journalRouter.post('/add', authMiddleware.isAuthenticated, journalController.postNewJournal);
journalRouter.post('/delete', authMiddleware.isAuthenticated, journalController.deleteJournal)
journalRouter.post('/update/:id', authMiddleware.isAuthenticated, journalController.updateJournal);

module.exports = journalRouter;