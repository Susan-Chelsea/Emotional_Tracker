const axios = require('axios');

exports.index = (request, response) => {
    response.render('index');
};

exports.registrationPage = (request, response) => {
    console.log(request)
    response.render('register');
}

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}

exports.login = async (req, res) => {
    const endpoint = `${process.env.BASE_API_URL}/auth/authenticateUser`;

    await axios
        .post(endpoint, req.body)
        .then((response) => {
            if (response.data.authenticated) {
                const session = req.session;
                session.isloggedin = true;
                session.profile = response.data.profile;
                res.redirect('/journals');
            } else {
                res.redirect('/');
            }

        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
        });
}

exports.register = async (req, res) => {
    const endpoint = `${process.env.BASE_API_URL}/users/addUser`;

    await axios
        .post(endpoint, req.body)
        .then((response) => {
            if (response.data.success) {
                res.render('index', {accountCreated: true});
            } else {
                throw new Error("Something went wrong creating account.");
            }

        })
        .catch((error) => {
            res.render("register", {errorMessage: error});
        });
}