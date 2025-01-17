import { connectionDB } from "../database/db.js";

async function findGames() {
  return (await connectionDB.query
    (`SELECT games.*, 
    categories.name AS "categoryName" 
    FROM games JOIN categories
    ON games."categoryId" = categories.id; `)).rows;
}

async function findGamesLikeName(name){
  return (await connectionDB.query(
    `SELECT games.*,
    categories.name AS "categoryName"
    FROM games JOIN categories
    ON games."categoryId" = categories.id
    WHERE games.name ILIKE $1 || '%';`, [name]
  )).rows;
}

async function createGame({ name, image, stockTotal, categoryId, pricePerDay }) {
  return await connectionDB.query(
    `INSERT INTO games
  (name, image, "stockTotal", "categoryId", "pricePerDay")
  VALUES ($1, $2, $3, $4, $5);`,
    [name, image, stockTotal, categoryId, pricePerDay]);
}
export const gamesRepository = {
  findGames,
  findGamesLikeName,
  createGame
}