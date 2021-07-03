import * as BookmarksController from '../controllers/bookmarks.controller.mjs'
import { validTokenNeeded } from '../middlewares/auth.validation.middleware.mjs'

export default app => {
    app.post('/bookmarks', [
        validTokenNeeded,
        BookmarksController.create
    ])

    app.get('/bookmarks', [
        validTokenNeeded,
        BookmarksController.list
    ])

    app.delete('/bookmarks/:id', [
        validTokenNeeded,
        BookmarksController.remove
    ])
}