import { connectionDB } from "../database/db.js";

async function findGames() {
  return (await connectionDB.query
    (`SELECT games.*, 
    categories.name AS "categoryName" 
    FROM games JOIN categories
    ON games."categoryId" = categories.id; `)).rows;
}

async function findGameById(id){
  return (await connectionDB.query(`
    SELECT * FROM games WHERE id=$1;`, [id])).rows[0];
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

async function findGameByName(name){
  return (await connectionDB.query(`
    SELECT * FROM games WHERE name=$1`, [name])).rowCount;
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
  findGameById,
  findGameByName,
  findGamesLikeName,
  createGame,
}