import { Router } from "express";
import { validateRent, verifyRent } from "../middlewares/rentals.middleware.js";
import {getRents, postRentReturn, deleteRental, postRental} from '../controllers/rentals.controller.js';

const router = Router();

router.get('/rentals', getRents);
router.post('/rentals', validateRent, postRental);
router.post('/rentals/:id/return', verifyRent, postRentReturn);
router.delete('/rentals/:id', verifyRent, deleteRental);

export default router;