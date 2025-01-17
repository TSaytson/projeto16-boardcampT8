import { connectionDB } from "../database/db.js";

async function findCategories(){
  return (await connectionDB.query('SELECT * FROM categories;')).rows;
}

async function createCategorie(name){
  return await connectionDB.query('INSERT INTO categories (name) VALUES ($1);', [name])
}

async function findCategoryById(id){
  return (await connectionDB.query(`SELECT * FROM categories WHERE id=$1;`, [id])).rowCount
}

export const categoriesRepository = {
  findCategories,
  createCategorie,
  findCategoryById
}