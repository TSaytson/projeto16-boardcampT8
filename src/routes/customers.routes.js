import { Router } from "express";
import { validateCustomer } from "../middlewares/customers.middlewares.js";
import {getCustomers, getCustomerById, postCustomer, putCustomer} from '../controllers/customers.controllers.js';

const router = Router();

router.get('/customers', getCustomers);
router.get('/customer/:id', getCustomerById);
router.post('/customer', validateCustomer, postCustomer);
router.put('/customer/:id', validateCustomer, putCustomer);

export default router;