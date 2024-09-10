const isAdmin = (req, res, next) => {
    console.log('Session:', req.session);
    console.log('User:', req.session?.user);
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Accès refusé" });
    }
};

export default isAdmin;