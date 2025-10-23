import { Router } from 'express';
import { usersController } from '../controllers/users.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', (req, res) => usersController.login(req, res));
router.post('/register', (req, res) => usersController.register(req, res));
router.get('/:userId', authMiddleware, (req, res) => usersController.getUserById(req, res));

export = router;
