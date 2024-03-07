const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv').config({path: './config.env'});

const authRouter = require('./src/routers/authRouter')
const journalRouter = require('./src/routers/journalRouter')

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/icons/', express.static(path.join(__dirname, '/public/icons/')));
app.use(express.static(path.join(__dirname, './src/charts/')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'subedobee',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 36000 * 20}
}));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', authRouter);
app.use('/journals', journalRouter);

app.use((req, res, next) => {
    res.render('error');
})


app.listen(PORT, () => {
    debug(`listening on port ${chalk.magenta(PORT)}`);
});