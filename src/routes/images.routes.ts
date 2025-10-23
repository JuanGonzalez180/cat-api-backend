import { Router } from 'express';
import { imagesController } from '../controllers/images.controller';

const router = Router();

router.get('/by-breed', (req, res) => imagesController.getImagesByBreedId(req, res));
router.get('/:image_id', (req, res) => imagesController.getImageById(req, res));

export = router;
