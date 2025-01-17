import { Router } from "express";
import categoriesRoutes from './categories.routes.js'
import customersRoutes from './customers.routes.js'
import gamesRoutes from './games.routes.js'
import rentalsRoutes from './rentals.routes.js'

const router = Router()

router.use([categoriesRoutes, customersRoutes, gamesRoutes, rentalsRoutes])

export default router;