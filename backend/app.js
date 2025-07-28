import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user-routes.js'
import artistRouter from './routes/artist-routes.js'

const app = express()

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json())

app.use(userRoutes)
app.use(artistRouter)

export default app