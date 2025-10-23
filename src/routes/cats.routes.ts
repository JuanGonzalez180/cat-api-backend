import { Router } from 'express';
import { catsController } from '../controllers/cats.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Protect all cat routes with authentication
router.use(authMiddleware);

router.get('/breeds', (req, res) => catsController.getBreeds(req, res));
router.get('/breeds/search', (req, res) => catsController.searchBreeds(req, res));
router.get('/breeds/:breed_id', (req, res) => catsController.getBreedById(req, res));

export = router;
