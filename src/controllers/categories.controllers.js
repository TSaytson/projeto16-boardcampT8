import { connectionDB } from "../database/db.js";

export async function getCategories(req, res) {
    try {
        const { rows } = await connectionDB.query('SELECT * FROM categories;');
        res.send(rows).status(200);
    } catch (error) {
        console.log(error);
        res.send(error.message).status(500);
    }
}

export async function postCategories(req, res) {
    const { name } = res.locals.categorie;
    try {
        await connectionDB.query('INSERT INTO categories (name) VALUES ($1);', [name]);
        res.send(`Categoria ${name} inserida`).status(201);
    } catch (error) {
        console.log(error);
        res.send(error.message).status(500);
    }
}