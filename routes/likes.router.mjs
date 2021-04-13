import * as LikesController from '../controllers/likes.controller.mjs'
import { validTokenNeeded } from '../middlewares/auth.validation.middleware.mjs'
import { onlyLikerAllowed } from '../middlewares/auth.permission.middleware.mjs'

import Like from '../models/likes.model.mjs'

export default app => {
    app.post('/like', [
        validTokenNeeded,
        LikesController.like
    ])
    
    app.post('/dislike', [
        validTokenNeeded,
        LikesController.dislike
    ])

    app.delete('/like/:id', [
        validTokenNeeded,
        onlyLikerAllowed(Like),
        LikesController.unlike
    ])
}