const isAdmin = (req, res, next) => {
    console.log('Session:', req.session);
    console.log('User:', req.session?.user);
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        next(); // Permet à la requête de continuer si l'utilisateur est admin
    } else {
        res.redirect('/'); // Redirige vers la page d'accueil si l'utilisateur n'est pas admin
    }
};

export default isAdmin;