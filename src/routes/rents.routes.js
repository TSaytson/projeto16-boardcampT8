import { Router } from "express";
import { validateRent, verifyRent } from "../middlewares/rents.middlewares.js";
import {postRent, getRents, deleteRent} from '../controllers/rents.controllers.js';

const router = Router();

router.get('/rentals', getRents);
router.post('/rentals', validateRent, postRent);
router.post('/rentals/:id/return');
router.delete('/rentals/:id', verifyRent, deleteRent);

export default router;