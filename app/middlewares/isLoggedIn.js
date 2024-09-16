const isLoggedIn = (req, res, next) => {
    console.log("Vérification de l'authentification");
    if (req.session && req.session.user) {
        console.log("Utilisateur authentifié:", req.session.user);
        next();
    } else {
        console.log("Utilisateur non authentifié, redirection vers la page de connexion");
        res.redirect('/connexion');
    }
};

export default isLoggedIn;