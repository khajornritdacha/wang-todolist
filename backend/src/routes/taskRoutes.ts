import { Request, Response, Router } from 'express';
import { authenticateToken } from '../middlewares/authMiddlewares';
import { queryUser } from '../middlewares/queryUser';
import {
    createTask,
    deleteTask,
    getTask,
    getTasks,
    updateTask,
} from '../services/taskServices';

const router = Router();

router.use(authenticateToken, queryUser);

router.get('/', (req: Request, res: Response) => {
    res.send('Hello from api');
});

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTask);
router.post('/tasks', createTask);
router.put('/tasks', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
