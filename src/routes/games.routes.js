import { Router } from "express";
import {getGames, postGame } from "../controllers/games.controller.js";
import {validateBody} from '../middlewares/validation.middleware.js'
import {gameSchema} from '../schemas/game.schemas.js'

const router = Router();

router.get('/games', getGames);
router.post('/games', validateBody(gameSchema), postGame);

export default router;