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
async function findRentalById(id) {
  return (await connectionDB.query(`
    SELECT * FROM rentals WHERE id=$1;`, [id])).rows[0];
}

async function deleteRental(id) {
  return await connectionDB.query(`DELETE FROM rentals 
    WHERE id=$1;`, [id]);
}

async function findRentalsByGameId(gameId) {
  return (await connectionDB.query(`
    SELECT * FROM rentals WHERE 
    rentals."gameId"=$1 AND "returnDate" IS NULL;`, [gameId])).rows;
}

export const rentalsRepository = {
  createRental,
  findRentalById,
  deleteRental,
  findRentalsByGameId,

}