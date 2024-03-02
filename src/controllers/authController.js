const axios = require('axios');

exports.login = async (req, res) => {
    const endpoint = `http://localhost:3001/auth/authenticateUser`;

    await axios
        .post(endpoint, req.body, {headers: {'Content-Type': 'application/json'}})
        .then((response) => {
            if (response.data.authenticated) {
                const session = req.session;
                session.isloggedin = true;
                session.userId = response.data.userId;

                res.redirect('/journals');
            } else {
                res.redirect('/');
            }

        })
        .catch((error) => {
            console.log(`Error making API request: ${error}`);
        });
}