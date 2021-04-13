import * as VerifyUserMiddleware from '../middlewares/verify.user.middleware.mjs'
import * as AuthController from '../controllers/auth.controller.mjs'

export default app => {
    app.post('/auth/login', [
        VerifyUserMiddleware.hasValidAuthFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        AuthController.login
    ])
}