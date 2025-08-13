import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ authenticated: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.json({ authenticated: false });
        }

        req.userId = decoded.id;
        next();
        
    });
};