function isLoggedIn(req, res, next) {
    if (!req.session.user) {
        return res.redirect('/connexion');
    }

    return next();
}

module.exports = isLoggedIn;