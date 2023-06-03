import { Router } from 'express';
import UserService from '../services/userServices';

const router = Router();

router.get('/', (req, res) => {
    res.send('Auth home page');
});

router.get('/login', UserService.login);

export default router;
