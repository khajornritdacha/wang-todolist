import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
    res.send('Hello from login');
};

export default { login };
