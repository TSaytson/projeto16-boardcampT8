import { customersRepository } from "../repositories/customers.repository.js"

async function postCustomer({ name, phone, cpf, birthday }) {
  return await customersRepository.createCustomer({ name, phone, cpf, birthday })
}

async function getCustomers(cpf) {
  if (cpf)
    return await customersRepository.findCustomersLikeCpf(cpf);
  return await customersRepository.findCustomers();
}

async function getCustomerById(id) {
  return await customersRepository.findCustomerById(id)
}

async function putCustomer({ id, name, phone, birthday }) {
  return await customersRepository.updateCustomer({ id, name, phone, birthday });
}

export const customersService = {
  postCustomer,
  getCustomers,
  getCustomerById,
  putCustomer
}