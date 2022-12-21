import { Router } from "express";
import { getCategories, postCategories } from "../controllers/categories.controllers.js";
import { validateCategorie } from '../middlewares/categories.middlewares.js'
const router = Router();

router.get('/categories', getCategories);
router.post('/categories', validateCategorie, postCategories);

export default router;