import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'No se proveyó un token.' });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Formato de token inválido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'No autorizado. Token inválido o expirado.' });
        }
        req.user = decoded;
        next(); 
    });
};

export default verifyToken;