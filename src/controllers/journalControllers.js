const axios = require("axios");

exports.getAllJournalsByUserid = async (req, res) => {
    const {userId, firstName} = req?.session?.profile;
    const endpoint = `${process.env.BASE_API_URL}/journals/getAllJournals/${userId}`;

    await axios
        .get(endpoint)
        .then((response) => {
            res.render('journals', {journals: response.data.journals, firstName: firstName});
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
        });
}

exports.getJournalById = async (req, res) => {
    const journalId = req.params.id;
    const {userId} = req.session?.profile;

    const endpoint = `${process.env.BASE_API_URL}/journals/getJournal/${journalId}`;

    await axios
        .post(endpoint, {userId})
        .then((response) => {
            if (response.data.success) {
                res.render('journal', {journal: response.data.journal});
            } else {
                console.log(response.data.message)
                res.redirect('/journals')
            }
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
            res.redirect('/journals')
        });
}

exports.addNewJournal = (req, res) => {
    res.render('add-journal');
}

exports.postNewJournal = async (req, res) => {
    const endpoint = `${process.env.BASE_API_URL}/journals/add`;
    req.body.userId = req.session.profile.userId;

    await axios
        .post(endpoint, req.body)
        .then((response) => {
            res.redirect('/journals/');
        })
        .catch((error) => {
            console.error(`Error making API request: ${error}`);
            res.redirect('/journals/');
        });
}

exports.deleteJournal = async (req, res) => {
    const journalId = req.body.journalId;
    const endpoint = `${process.env.BASE_API_URL}/journals/delete/${journalId}`;

    await axios
        .delete(endpoint)
        .then((response) => {
            console.log(response.status)
            if (response.status === 200) {
                res.redirect('/journals/')
            }
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
            res.redirect('/journals/')
        });
}

exports.editJournal = async (req, res) => {
    const journalId = req.params.id;
    const {userId} = req.session.profile;

    const endpoint = `${process.env.BASE_API_URL}/journals/getJournal/${journalId}`;

    await axios
        .post(endpoint, {userId})
        .then((response) => {
            if (response.data.success) {
                res.render('edit-journal', {journal: response.data.journal});
            }
        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
            res.redirect('/journals')
        });
}

exports.updateJournal = async (req, res) => {
    const id = req.params.id;
    const endpoint = `${process.env.BASE_API_URL}/journals/update/${id}`;

    await axios
        .patch(endpoint, req.body)
        .then((response) => {
            res.redirect(`/journals/${id}`);
        })
        .catch((error) => {
            console.error(`Error making API request: ${error}`);
            res.redirect('/journals/');
        });
}