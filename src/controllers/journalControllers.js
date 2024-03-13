const axios = require("axios");

exports.getAllJournalsByUserid = async (req, res) => {
    const {userId, firstName} = req?.session?.profile;
    const endpoint = `${process.env.BASE_API_URL}/journals/getAllJournals/${userId}`;

    console.log(req.session)

    await axios
        .get(endpoint, {
            headers: {
                'api-key': req?.session?.profile.apiKey,
            }
        })
        .then((response) => {
            res.render('journals', {journals: response.data.journals, firstName: firstName});
        })
        .catch((error) => {
            handleError(error, res, '/');
        });
}

exports.getJournalById = async (req, res) => {
    const journalId = req.params.id;
    const {userId} = req.session?.profile;

    const endpoint = `${process.env.BASE_API_URL}/journals/getJournal/${journalId}`;

    await axios
        .post(
            endpoint,
            {userId},
            {
                headers: {
                    'api-key': req?.session?.profile.apiKey,
                }
            })
        .then((response) => {
            if (response.data.success) {
                res.render('journal', {journal: response.data.journal});
            } else {
                res.redirect('/journals')
            }
        })
        .catch((error) => {
            handleError(error, res, '/journals/');
        });
}

exports.addNewJournal = (req, res) => {
    res.render('add-journal');
}

exports.postNewJournal = async (req, res) => {
    const endpoint = `${process.env.BASE_API_URL}/journals/add`;
    req.body.userId = req.session.profile.userId;

    await axios
        .post(
            endpoint,
            req.body,
            {
                headers: {
                    'api-key': req?.session?.profile.apiKey,
                }
            })
        .then((response) => {
            res.redirect('/journals/');
        })
        .catch((error) => {
            handleError(error, res, '/journals/');
        });
}

exports.deleteJournal = async (req, res) => {
    const journalId = req.body.journalId;
    const endpoint = `${process.env.BASE_API_URL}/journals/delete/${journalId}`;

    await axios
        .delete(endpoint, {
            headers: {
                'api-key': req?.session?.profile.apiKey,
            }
        })
        .then((response) => {
            res.redirect('/journals/')
        })
        .catch((error) => {
            handleError(error, res, '/journals/');
        });
}

exports.editJournal = async (req, res) => {
    const journalId = req.params.id;
    const {userId} = req.session.profile;

    const endpoint = `${process.env.BASE_API_URL}/journals/getJournal/${journalId}`;

    await axios
        .post(
            endpoint,
            {userId},
            {
                headers: {
                    'api-key': req?.session?.profile.apiKey,
                }
            })
        .then((response) => {
            if (response.data.success) {
                res.render('edit-journal', {journal: response.data.journal});
            }
        })
        .catch((error) => {
            handleError(error, res, '/journals/');
        });
}

exports.updateJournal = async (req, res) => {
    const id = req.params.id;
    const endpoint = `${process.env.BASE_API_URL}/journals/update/${id}`;

    await axios
        .patch(endpoint,
            req.body,
            {
                headers: {
                    'api-key': req?.session?.profile.apiKey,
                }
            })
        .then((response) => {
            res.redirect(`/journals/${id}`);
        })
        .catch((error) => {
            handleError(error, res, '/journals/');
        });
}

exports.overview = async (req, res) => {
    const {userId, firstName} = req?.session?.profile;
    const endpoint = `${process.env.BASE_API_URL}/journals/getAllJournals/${userId}`;

    await axios
        .get(endpoint, {
            headers: {
                'api-key': req?.session?.profile.apiKey,
            }
        })
        .then((response) => {
            res.render('overview', {journals: response.data.journals, firstName: firstName});
        })
        .catch((error) => {
            handleError(error, res, '/journals');
        });
}

const handleError = (error, res, redirectPage) => {
    console.error(`Error making API request: ${error}`);
    res.redirect(redirectPage);
}
