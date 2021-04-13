import * as CommentsController from '../controllers/comments.controller.mjs'
import { validTokenNeeded } from '../middlewares/auth.validation.middleware.mjs'
import { onlyAuthorAllowed, onlyAuthorOrAdminAllowed, onlyPostAuthorAllowComment, allowPostAuthorCommentByDefault } from '../middlewares/auth.permission.middleware.mjs'

import Comment from '../models/comments.model.mjs'
import Post from '../models/posts.model.mjs'

export default app => {
    app.post('/comments', [
        validTokenNeeded,
        allowPostAuthorCommentByDefault(Post),
        CommentsController.addComment
    ])

    app.get('/comments', [
        CommentsController.list
    ])

    app.patch('/comments/:id', [
        validTokenNeeded,
        onlyAuthorAllowed(Comment),
        onlyPostAuthorAllowComment(Comment),
        CommentsController.updateComment
    ])

    app.delete('/comments/:id', [
        validTokenNeeded,
        onlyAuthorOrAdminAllowed(Comment),
        CommentsController.removeComment
    ])
}