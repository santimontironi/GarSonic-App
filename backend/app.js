import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user-routes.js'
import artistRouter from './routes/artist-routes.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { connect } from "./db.js";

import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(async (req, res, next) => {
  try {
    await connect();
    next();
  } catch (error) {
    console.error('Error de conexión DB:', error);
    return res.status(500).json({ 
      error: 'Error de conexión a base de datos',
      details: error.message 
    });
  }
});

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

// Configurar middleware para servir archivos estáticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use("/api", userRoutes);
app.use("/api",artistRouter)

export default app