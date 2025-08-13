import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
    // Obtener el token de la cookie
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No autorizado, token faltante." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.artistId = decoded.id;
        next(); 
    } catch (error) {
        console.error("Error al verificar token:", error);
        return res.status(401).json({ message: "Token inválido o expirado." });
    }
}