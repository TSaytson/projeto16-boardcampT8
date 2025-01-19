import { connectionDB } from "../database/db.js";
import { gamesService } from "../services/games.service.js";

export async function getGames(req, res) {
    const {name} = req.query;
    try {
        const games = await gamesService.getGames(name);
        res.status(200).send(games);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
}

export async function postGame(req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
    try {
        await gamesService.postGame({name, image, stockTotal, categoryId, pricePerDay})
        return res.status(201).send({message: `Jogo ${name} adicionado`});
    } catch (error) {
        console.log(error);
        error.status ? res.status(error.status).send(error) :
        res.status(500).send(error.message);
    }
}