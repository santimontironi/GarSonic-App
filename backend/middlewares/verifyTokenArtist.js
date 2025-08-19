import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
    // Obtener el token de la cookie
    const token = req.cookies.tokenArtist;
    
    if (!token) {
        return res.json({ authenticated: false });
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    
        if (err) {
            return res.json({ authenticated: false });
        }
    
        req.artistId = decoded.id;
        next();
            
    });
}