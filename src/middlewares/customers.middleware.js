import { customersRepository } from '../repositories/customers.repository.js';
import { customerSchema, updateCustomerSchema } from '../schemas/customer.schemas.js';

export async function validateCustomer(req, res, next) {
    let validation;
    if (req.method === 'PUT') {
        validation = updateCustomerSchema.validate(
            req.body, { abortEarly: false })
    } else {
        validation = customerSchema.validate(
            req.body, { abortEarly: false }
        );
    }
    if (validation.error) {
        const errors = validation.error.details.map(
            (detail) => detail.message
        );
        console.log(errors);
        return res.status(400).send(errors);
    }

    const { name, phone, cpf, birthday } = req.body;
    try {
        const customerFound = await customersRepository.findCustomerByCpf(cpf);
        if (customerFound && req.method !== 'PUT')
            return res.status(409).send('Cliente já cadastrado');
    } catch (error) {
        console.log(error);
        return res.sendStatus(422);
    }

    res.locals.customer = {
        name,
        phone,
        cpf,
        birthday
    }

    next();
}