import express from 'express'
import { connectWithRetry } from './services/mongo.service.mjs'
import config from './config/env.config.mjs'
import UsersRouter from './routes/users.router.mjs'

connectWithRetry()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

UsersRouter(app)

app.listen(config.port, () => console.log(`Server running on port ${config.port}...`))