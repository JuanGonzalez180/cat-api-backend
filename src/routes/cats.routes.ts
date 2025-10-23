import { Router } from 'express';
import { catsController } from '../controllers/cats.controller';

const router = Router();

router.get('/breeds', (req, res) => catsController.getBreeds(req, res));
router.get('/breeds/search', (req, res) => catsController.searchBreeds(req, res));
router.get('/breeds/:breed_id', (req, res) => catsController.getBreedById(req, res));

export = router;
