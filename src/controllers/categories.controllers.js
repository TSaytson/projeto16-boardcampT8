import { connectionDB } from "../database/db.js";

export async function getCategories(req, res) {
    try {
        const categories = (await connectionDB.query('SELECT * FROM categories;')).rows;
        res.send(categories).status(200);
    } catch (error) {
        console.log(error);
        res.send(error.message).status(500);
    }
}

export async function postCategorie(req, res) {
    const { name } = res.locals.categorie;
    try {
        await connectionDB.query('INSERT INTO categories (name) VALUES ($1);', [name]);
        res.send(`Categoria ${name} inserida`).status(201);
    } catch (error) {
        console.log(error);
        res.send(error.message).status(500);
    }
}