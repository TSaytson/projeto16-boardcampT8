import { connectionDB } from "../database/db.js"

async function findRentalById(id){
  return (await connectionDB.query(`
    SELECT * FROM rentals WHERE id=$1;`, [id])).rows[0];
}

export const rentalsRepository = {
  findRentalById
}