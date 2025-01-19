import { categoriesRepository } from "../repositories/categories.repository.js";
import { gamesRepository } from "../repositories/games.repository.js"

async function getGames(name) {
  if (name)
    return await gamesRepository.findGamesLikeName(name);
  return await gamesRepository.findGames();
}

async function postGame({ name, categoryId, image, pricePerDay, stockTotal }) {
  const categoryFound = await categoriesRepository.findCategoryById(categoryId)
  if (!categoryFound)
    throw ({ message: 'Categoria inexistente', status: 400 });
  const gameFound = await gamesRepository.findGameByName(name);
  if (gameFound) {
    throw ({message:'Jogo já cadastrado', status:409});
  }
  return await gamesRepository.createGame({ name, categoryId, image, pricePerDay, stockTotal })
}

export const gamesService = {
  getGames,
  postGame
}