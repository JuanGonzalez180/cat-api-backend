import { Router } from 'express';
import { imagesController } from '../controllers/images.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Protect all image routes with authentication
router.use(authMiddleware);

router.get('/by-breed', (req, res) => imagesController.getImagesByBreedId(req, res));
router.get('/:image_id', (req, res) => imagesController.getImageById(req, res));

export = router;
