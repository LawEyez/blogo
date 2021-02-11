import * as UsersController from '../controllers/users.controller.mjs'
 
export default app => {
    app.post('/users', [
        UsersController.insert
    ])

    app.get('/users', [
        UsersController.list
    ])

}

