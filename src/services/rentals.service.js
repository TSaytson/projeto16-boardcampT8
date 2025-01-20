import dayjs from "dayjs";
import { customersRepository } from "../repositories/customers.repository.js";
import { gamesRepository } from "../repositories/games.repository.js";
import { rentalsRepository } from "../repositories/rentals.repository.js"

async function postRental({ customerId, gameId, rentDate, daysRented, returnDate, delayFee }) {
  const customerFound = await customersRepository.findCustomerById(customerId);
  if (!customerFound)
    throw ({ message: 'Cliente não encontrado', status: 400 });
  const gameFound = await gamesRepository.findGameById(gameId);
  if (!gameFound)
    throw ({ message: 'Jogo não encontrado', status: 400 });
  const gameRentals = await rentalsRepository.findOpenRentalsByGameId(gameId);
  if (gameRentals.length >= gameFound.stockTotal)
    throw ({ message: 'Jogo esgotado', status: 400 })
  const originalPrice =
    (daysRented) * (gameFound.pricePerDay);

  return await rentalsRepository.createRental({
    customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee
  })
}

async function getRentals({ customerId, gameId }) {
  if (gameId && customerId) {
    return await rentalsRepository.findRentalsByCustomerIdGameId({ customerId, gameId })
  }
  else if (customerId) {
    return await rentalsRepository.findRentalsByCustomerId(customerId);
  }
  else if (gameId) {
    return await rentalsRepository.findRentalsByGameId(gameId);
  }
  else {
    return await rentalsRepository.findRentals();
  }
}

async function rentalReturn(rentalId) {
  const rentalFound = await rentalsRepository.findRentalById(rentalId);
  if (!rentalFound)
    throw ({ message: 'Aluguel não encontrado', status: 400 });
  if (rentalFound.returnDate)
    throw ({ message: 'Jogo já devolvido', status: 400 });
  const gameRented = await gamesRepository.findGameById(rentalFound.gameId);
  rentalFound.returnDate = dayjs(Date.now());
  const dateToBeReturned = dayjs(rentalFound.rentDate).add(rentalFound.daysRented, 'days');
  const diffDays = (dayjs(rentalFound.returnDate).diff(dayjs(dateToBeReturned), 'days'))
  if (diffDays > 0)
    rentalFound.delayFee = diffDays * gameRented.pricePerDay;

  await rentalsRepository.updateRental(rentalFound);
  return gameRented;

}

async function deleteRental(id) {
  return await rentalsRepository.deleteRental(id);
}

export const rentalsService = {
  postRental,
  getRentals,
  rentalReturn,
  deleteRental
}