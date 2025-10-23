import { Router } from 'express';
import { usersController } from '../controllers/users.controller';

const router = Router();

router.post('/login', (req, res) => usersController.login(req, res));
router.post('/register', (req, res) => usersController.register(req, res));
router.get('/:userId', (req, res) => usersController.getUserById(req, res));

export = router;
