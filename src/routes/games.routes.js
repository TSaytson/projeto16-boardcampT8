import { Router } from "express";
import {getGames, postGame } from "../controllers/games.controller.js";
import { validateGame } from "../middlewares/games.middleware.js";

const router = Router();

router.get('/games', getGames);
router.post('/games', validateGame, postGame);

export default router;