import { Router } from "express";
import {validateBody, validateParams} from "../middlewares/validation.middleware.js"
import { rentalSchema } from "../schemas/rental.schemas.js";
import {getRentals, postRentReturn, deleteRental, postRental} from '../controllers/rentals.controller.js';
import { idParamsSchema } from "../schemas/idParams.schemas.js";

const router = Router();

router.get('/rentals', getRentals);
router.post('/rentals', validateBody(rentalSchema), postRental);
router.post('/rentals/:id/return', validateParams(idParamsSchema), postRentReturn);
router.delete('/rentals/:id', validateParams(idParamsSchema), deleteRental);

export default router;