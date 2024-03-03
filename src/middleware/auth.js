exports.isAuthenticated = (req, res, next) => {
    const { isloggedin } = req.session;

    if (isloggedin) {
        next();
    } else {
        res.redirect('/');
    }
};