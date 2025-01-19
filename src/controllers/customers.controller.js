import { customersService } from "../services/customers.service.js";

export async function postCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;
    try {
        await customersService.postCustomer({name, phone, cpf, birthday})
        return res.status(201).send({
            message:
                `Cliente ${name} cadastrado`
        });
    } catch (error) {
        console.log(error);
        error.status ? res.status(error.status).send(error) :
        res.status(500).send(error.message);;
    }
}

export async function getCustomers(req, res) {
    const {cpf} = req.query
    try {
        const customers = await customersService.getCustomers(cpf)
        return res.status(200).send(customers);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params;
    try {
        const customerFound = await customersService.getCustomerById(id)
        if (customerFound)
            return res.status(200).send(customerFound);
        else
            return res.status(404).send({message:'Cliente não encontrado'});
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export async function putCustomer(req, res) {
    const { name, phone, birthday } = req.body;
    const { id } = req.params;
    try {
        await customersService.putCustomer({id, name, phone, birthday});
        res.status(200).send({message: 'Dados do cliente atualizados'});
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}