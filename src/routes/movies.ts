import { RequestHandler, Router } from "express";
import { celebrate } from 'celebrate';
import { getMovies, createMovie, deleteMovie } from '../controllers/movies';
import { ruleCreateMovie, ruleParamsContainsId } from '../validators/movies';

const router = Router();

router.get('/', (getMovies as RequestHandler));
router.post('/', celebrate(ruleCreateMovie), (createMovie as RequestHandler));
router.delete('/:_id', celebrate(ruleParamsContainsId), (deleteMovie as RequestHandler));

export default router;
