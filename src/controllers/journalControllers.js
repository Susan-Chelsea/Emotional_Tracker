const axios = require("axios");
exports.getAllJournalsByUserid = async (req, res) => {
    const endpoint = `http://localhost:3001/journals/getAllJournals/${req?.session?.userId}`;

    if (!req.session.isloggedin) {
        res.redirect('/')
    }

    await axios
        .get(endpoint, {headers: {'Content-Type': 'application/json'}})
        .then((response) => {
            res.render('journals', {journals: response.data.journals});
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
        });
}

exports.addJournal = async (req, res) => {
    const endpoint = `http://localhost:3001/journals/addJournal`;


    if (!req.session.isloggedin) {
        res.redirect('/')
    }

    req.body.userId = req.session.userId;

    await axios
        .post(endpoint, req.body, {headers: {'Content-Type': 'application/json'}})
        .then((response) => {
            res.redirect('/journals/');
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
        });
}
