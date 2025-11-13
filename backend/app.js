import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/user-routes.js'
import artistRouter from './routes/artist-routes.js'

import dotenv from "dotenv";
dotenv.config();

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.FRONTEND_URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())
app.use(cookieParser())


app.use("/api", userRoutes);
app.use("/api",artistRouter)

export default app