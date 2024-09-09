import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization']; //Récupération en-tête 
    const token = authHeader && authHeader.split(' ')[1]; //Si 'authHeader' existe et n'est pas vide, alors nous sélectionnons le 2nd élément du tableau (JWT Token)

    if (!token) {
        return res.status(401).json({ error: 'Accès refusé' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token invalide' });
    }
};

export default authMiddleware;