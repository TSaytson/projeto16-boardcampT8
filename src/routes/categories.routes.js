import { Router } from "express";
import { getCategories, postCategorie } from "../controllers/categories.controller.js";
import { validateCategorie } from '../middlewares/categories.middleware.js'

const router = Router();

router.get('/categories', getCategories);
router.post('/categories', validateCategorie, postCategorie);

export default router;