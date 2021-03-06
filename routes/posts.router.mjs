import * as PostsController from '../controllers/posts.controller.mjs'
import { validTokenNeeded } from '../middlewares/auth.validation.middleware.mjs'
import { onlyAuthorAllowed, onlyAuthorOrAdminAllowed } from '../middlewares/auth.permission.middleware.mjs'

import Post from '../models/posts.model.mjs'

export default app => {
    app.post('/posts', [
        validTokenNeeded,
        PostsController.createPost
    ])
    
    app.get('/posts', [
        PostsController.list
    ])

    app.get('/posts/:id', [
        PostsController.getPost
    ])
    
    app.get('/posts/user/:userId', [
        PostsController.getUserPosts
    ])

    app.patch('/posts/:id', [
        validTokenNeeded,
        onlyAuthorAllowed(Post),
        PostsController.updatePost
    ])
    
    app.patch('/posts/reads/:id', [
        PostsController.increasePostReadCount
    ])
    
    app.delete('/posts/:id', [
        validTokenNeeded,
        onlyAuthorOrAdminAllowed(Post),
        PostsController.removePost
    ])
}