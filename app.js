const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    response.render('index', {title: 'AdamSube Adventures', data: ['a', 'b', 'c'] });
});

app.listen(PORT, () => {
    debug(`listening on port ${chalk.magenta(PORT)}`);
});