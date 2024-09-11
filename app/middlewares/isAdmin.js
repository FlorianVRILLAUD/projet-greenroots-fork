const isAdmin = (req, res, next) => {
    console.log('Session:', req.session);
    console.log('User:', req.session?.user);
    if (req.session && req.session.user && req.session.user.role === 'Admin') {
        next(); // Permet à la requête de continuer si l'utilisateur est admin
    } else {
        res.status(403)
    }
};

export default isAdmin;