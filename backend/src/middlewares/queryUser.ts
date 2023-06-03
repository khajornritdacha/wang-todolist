import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import { UserRequest } from '../models/dto';

export const queryUser = async (
    req: UserRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const email = req.user?.email;
        const user = await User.findOne({ email });
        if (!user)
            return res.sendStatus(401).json({ message: 'User not found' });
        req.user = user;
        next();
    } catch (err) {
        console.log('Error at queryUser middleware');
        return res.sendStatus(500);
    }
};
