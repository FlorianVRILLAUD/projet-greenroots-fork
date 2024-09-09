import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({error:'Accès refusé'})
    }
}
try { const decoded = jwt.verify(token, 'secret_key');
req.userId = decoded.userId;
next();
} catch (error) { 
    res.status(401).json({ error: 'token invalide'});
}

module.exports = authMiddleware;