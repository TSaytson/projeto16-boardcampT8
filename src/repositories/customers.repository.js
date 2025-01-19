import { connectionDB } from "../database/db.js"

async function createCustomer({name, phone, cpf, birthday}){
  return (await connectionDB.query(`INSERT INTO customers 
    (name, phone, cpf, birthday) 
    VALUES ($1, $2, $3, $4)`,[
        name,
        phone,
        cpf,
        birthday
    ]));
}

async function findCustomersLikeCpf(cpf){
  return (await connectionDB.query(`SELECT * FROM
    customers WHERE cpf LIKE $1 || '%';`, [cpf])).rows;
}

async function findCustomerByCpf(cpf){
  return (await connectionDB.query(`SELECT * FROM
    customers WHERE cpf = $1;`, [cpf])).rowCount;
}

async function findCustomers(){
  return (await connectionDB.query(`SELECT * FROM
    customers;`)).rows;
}

async function findCustomerById(id){
  return (await connectionDB.query(`SELECT * FROM
    customers WHERE id=$1;`, [id])).rows[0]
}

async function customerNameView(){
  return (await connectionDB.query(`
    SELECT id, name FROM customers WHERE id=$1;`,
        [rentals[i].customerId])).rows[0];
}

async function updateCustomer({id, name, phone, birthday}){
  return await connectionDB.query(`UPDATE customers SET name=$1,
    phone=$2, birthday=$3 WHERE id=$4`,
        [name, phone, birthday, id]);
}

export const customersRepository = {
  findCustomers,
  customerNameView,
  findCustomersLikeCpf,
  findCustomerByCpf,
  createCustomer,
  findCustomerById,
  updateCustomer
}