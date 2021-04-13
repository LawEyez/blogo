import express from 'express'
import _ from 'dotenv'
import { connectWithRetry } from './services/mongo.service.mjs'
import UsersRouter from './routes/users.router.mjs'
import AuthRouter from './routes/auth.router.mjs'
import PostsRouter from './routes/posts.router.mjs'
import CategoriesRouter from './routes/categories.router.mjs'
import CommentsRouter from './routes/comments.router.mjs'
import SubsRouter from './routes/subs.router.mjs'
import LikesRouter from './routes/likes.router.mjs'

_.config()
connectWithRetry()

const app = express()
const port = 8000

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
    res.header('Access-Control-Expose-Headers', 'Content-Length')
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-Width, Range')

    if (req.method === 'OPTIONS') return res.sendStatus(200)
    
    next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

AuthRouter(app)
UsersRouter(app)
PostsRouter(app)
CategoriesRouter(app)
CommentsRouter(app)
SubsRouter(app)
LikesRouter(app)

app.listen(port, () => console.log(`Server running on port ${port}...`))