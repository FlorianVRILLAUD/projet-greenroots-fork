const authMiddleware = (req, res, next) => {
    console.log("Exécution de setUserMiddleware");
    
    res.locals.user = null;

    if (req.session && req.session.user) {
        console.log("Session utilisateur trouvée:", req.session.user);
        res.locals.user = req.session.user;
    } else {
        console.log("Aucune session utilisateur trouvée");
    }
    next();
};

export default authMiddleware;