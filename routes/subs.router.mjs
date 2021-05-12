import * as SubsController from '../controllers/subs.controller.mjs'
import { validTokenNeeded } from '../middlewares/auth.validation.middleware.mjs'


export default app => {
    app.post('/subscribe', [
        validTokenNeeded,
        SubsController.subscribe
    ])

    app.get('/subs', [
        validTokenNeeded,
        SubsController.getSubs
    ])

    app.delete('/subscribe/:id', [
        validTokenNeeded,
        SubsController.unsubscribe
    ])
}

