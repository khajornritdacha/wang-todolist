import { Router } from 'express';
import { login, register } from '../services/userServices';

const router = Router();

router.get('/', (req, res) => {
    res.send('Auth home page');
});

router.post('/login', login);

router.post('/register', register);

export default router;
