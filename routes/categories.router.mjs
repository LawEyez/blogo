import * as CategoriesController from '../controllers/categories.controller.mjs'
import { validTokenNeeded } from '../middlewares/auth.validation.middleware.mjs'
import { minimumPermissionLevelRequired } from '../middlewares/auth.permission.middleware.mjs'
import _ from 'dotenv'

const ADMIN = parseInt(process.env.ADMIN)

_.config()

export default app => {
    app.post('/categories', [
        validTokenNeeded,
        minimumPermissionLevelRequired(ADMIN),
        CategoriesController.addCategory
    ])
    
    app.get('/categories', [
        validTokenNeeded,
        CategoriesController.list
    ])

    app.delete('/categories/:categoryId', [
        validTokenNeeded,
        minimumPermissionLevelRequired(ADMIN),
        CategoriesController.removeCategory
    ])
} 
