import { customersRepository } from "../repositories/customers.repository.js";
import { gamesRepository } from "../repositories/games.repository.js";
import { rentalsRepository } from "../repositories/rentals.repository.js"

async function postRental({ customerId, gameId, rentDate, daysRented, returnDate, delayFee }) {
  const gameFound = await gamesRepository.findGameById(gameId);
  if (!gameFound)
    throw ({ message: 'Jogo não encontrado', status: 400 });
  const gameRentals = await rentalsRepository.findRentalsByGameId(gameId);
  if (gameRentals.length >= gameFound.stockTotal)
    throw ({ message: 'Jogo esgotado', status: 400 })
  const originalPrice =
    (daysRented) * (gameFound.pricePerDay);

  return await rentalsRepository.createRental({
    customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee
  })
}

async function getRentals({customerId, gameId}) {
  let rentals;
  if (gameId && customerId) {
    rentals = (await connectionDB.query(`SELECT * FROM 
            rentals WHERE "customerId"=$1 AND "gameId"=$2;`,
      [customerId, gameId])).rows;
  }
  else if (customerId) {
    rentals = (await connectionDB.query(`SELECT * FROM 
            rentals WHERE "customerId"=$1;`, [customerId])).rows;
  }
  else if (gameId) {
    rentals = (await connectionDB.query(`SELECT * FROM 
            rentals WHERE "gameId"=$1;`, [gameId])).rows;
  }
  else {
    rentals = (await connectionDB.query(`SELECT * FROM 
            rentals;`)).rows;
  }
}

async function deleteRental(id) {
  return await rentalsRepository.deleteRental(id);
}
export const rentalsService = {
  postRental,
  getRentals,
  deleteRental
}