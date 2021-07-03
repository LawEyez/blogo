import { overview } from "../controllers/dashboard.controller.mjs";
import { validTokenNeeded } from '../middlewares/auth.validation.middleware.mjs'

export default app => {
  app.get('/overview', [
    validTokenNeeded,
    overview
  ])
}