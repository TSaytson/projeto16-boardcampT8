import { categoriesRepository } from "../repositories/categories.repository.js"

async function getCategories(){
  return await categoriesRepository.findCategories();
}

async function postCategorie(name){
  return categoriesRepository.createCategorie(name);
}

export const categoriesService = {
  getCategories,
  postCategorie
}