import { connectionDB } from "../database/db.js"

async function createRental({
  customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee
}) {
  await connectionDB.query(`INSERT INTO rentals 
    ("customerId", "gameId", "rentDate", "daysRented", 
    "returnDate", "originalPrice", "delayFee") 
    VALUES ($1, $2, $3, $4, $5, $6, $7);`, [
    customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee
  ]);
}

async function findRentalsOnly(){
  return (await connectionDB.query(`SELECT * FROM 
    rentals;`)).rows;
}

async function findRentals(){
  return (await connectionDB.query(`SELECT rentals.*,
    jsonb_build_object(
    'id', customers.id,
    'name', customers.name
    ) AS customer,
    jsonb_build_object(
    'id', games.id,
    'name', games.name,
    'categoryId', games."categoryId",
    'categoryName', categories.name
    ) AS game
    FROM rentals
    JOIN customers ON rentals."customerId"=customers.id
    JOIN games ON rentals."gameId"=games.id
    JOIN categories ON games."categoryId"=categories.id;`)).rows;
}

async function findRentalById(id) {
  return (await connectionDB.query(`
    SELECT * FROM rentals WHERE id=$1;`, [id])).rows[0];
}

async function findRentalsByCustomerIdGameId({customerId, gameId}){
  return (await connectionDB.query(`SELECT rentals.*,
    jsonb_build_object(
    'id', customers.id,
    'name', customers.name
    ) AS customer,
    jsonb_build_object(
    'id', games.id,
    'name', games.name,
    'categoryId', games."categoryId",
    'categoryName', categories.name
    ) AS game
    FROM rentals
    JOIN customers ON rentals."customerId"=customers.id
    JOIN games ON rentals."gameId"=games.id
    JOIN categories ON games."categoryId"=categories.id
    WHERE "customerId"=$1 AND "gameId"=$2;`,
[customerId, gameId])).rows;
}

async function findRentalsByCustomerId(customerId){
  return (await connectionDB.query(`SELECT rentals.*,
    jsonb_build_object(
    'id', customers.id,
    'name', customers.name
    ) AS customer,
    jsonb_build_object(
    'id', games.id,
    'name', games.name,
    'categoryId', games."categoryId",
    'categoryName', categories.name
    ) AS game
    FROM rentals
    JOIN customers ON rentals."customerId"=customers.id
    JOIN games ON rentals."gameId"=games.id
    JOIN categories ON games."categoryId"=categories.id
    WHERE "customerId"=$1;`, [customerId])).rows;
}

async function findRentalsByGameId(gameId){
  return (await connectionDB.query(`SELECT rentals.*,
    jsonb_build_object(
    'id', customers.id,
    'name', customers.name
    ) AS customer,
    jsonb_build_object(
    'id', games.id,
    'name', games.name,
    'categoryId', games."categoryId",
    'categoryName', categories.name
    ) AS game
    FROM rentals
    JOIN customers ON rentals."customerId"=customers.id
    JOIN games ON rentals."gameId"=games.id
    JOIN categories ON games."categoryId"=categories.id
    WHERE "gameId"=$1;`, [gameId])).rows;
}

async function updateRental({id, returnDate, delayFee}){
  return await connectionDB.query(`
    UPDATE rentals SET
    "returnDate"=$1, "delayFee"=$2
    WHERE id=$3`, [returnDate, delayFee, id])
}

async function deleteRental(id) {
  return await connectionDB.query(`DELETE FROM rentals 
    WHERE id=$1;`, [id]);
}

async function findOpenRentalsByGameId(gameId) {
  return (await connectionDB.query(`
    SELECT * FROM rentals WHERE 
    rentals."gameId"=$1 AND "returnDate" IS NULL;`, [gameId])).rows;
}

export const rentalsRepository = {
  createRental,
  findRentalsOnly,
  findRentals,
  findRentalById,
  findRentalsByCustomerIdGameId,
  findRentalsByCustomerId,
  findRentalsByGameId,
  updateRental,
  findOpenRentalsByGameId,
  deleteRental,
}