import * as ValidationMiddleware from '../middlewares/auth.validation.middleware.mjs'
import * as PermissionMiddleware from '../middlewares/auth.permission.middleware.mjs'
import * as UsersController from '../controllers/users.controller.mjs'
import _ from 'dotenv'

_.config()

const ADMIN = parseInt(process.env.ADMIN)
const PAID = parseInt(process.env.PAID_USER)
const FREE = parseInt(process.env.NORMAL_USER)
 
export default app => {
    app.post('/users', [
        UsersController.createUser
    ])

    app.get('/users', [
        ValidationMiddleware.validTokenNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.list
    ])

    app.get('/users/:id', [
        UsersController.getById
    ])

    app.patch('/users/:id', [
        ValidationMiddleware.validTokenNeeded,
        PermissionMiddleware.sameUserOrAdminAllowed,
        PermissionMiddleware.onlyAdminChangePermission,
        UsersController.patchById
    ])

    app.delete('/users/:id', [
        ValidationMiddleware.validTokenNeeded,
        PermissionMiddleware.sameUserOrAdminAllowed,
        UsersController.removeById
    ])

}

