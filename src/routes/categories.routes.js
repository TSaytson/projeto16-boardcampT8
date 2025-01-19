import { Router } from "express";
import { getCategories, postCategorie } from "../controllers/categories.controller.js";
import { categorieSchema } from "../schemas/categorie.schemas.js";
import { validateBody } from "../middlewares/validation.middleware.js";

const router = Router();

router.get('/categories', getCategories);
router.post('/categories', validateBody(categorieSchema), postCategorie);

export default router;