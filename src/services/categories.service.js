import { categoriesRepository } from "../repositories/categories.repository.js"

async function getCategories(){
  return await categoriesRepository.findCategories();
}

async function postCategorie(name){
  const categorieFound = await categoriesRepository.findCategoryByName(name);
  if (categorieFound)
      throw ({message: 'Categoria já cadastrada', status:409});
  return categoriesRepository.createCategorie(name);
}

export const categoriesService = {
  getCategories,
  postCategorie
}