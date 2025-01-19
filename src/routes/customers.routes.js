import { Router } from "express";
import { validateBody, validateParams } from "../middlewares/validation.middleware.js";
import {getCustomers, getCustomerById, postCustomer, putCustomer} from '../controllers/customers.controller.js';
import { createCustomerSchema, updateCustomerSchema } from "../schemas/customer.schemas.js";
import { idParamsSchema } from "../schemas/idParams.schemas.js";

const router = Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', validateParams(idParamsSchema), getCustomerById);
router.post('/customers', validateBody(createCustomerSchema), postCustomer);
router.put('/customers/:id', validateParams(idParamsSchema), validateBody(updateCustomerSchema), putCustomer);

export default router;