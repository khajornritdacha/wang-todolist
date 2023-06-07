import dotenv from 'dotenv';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CredentialDto, UserRequest } from '../models/dto';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'local'}` });

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'SECRET';

export function authenticateToken(
    req: UserRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // console.log('Auth middle ware -> Access token: ', token);

    if (!token) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        if (!user) return res.sendStatus(403);
        req.user = user as CredentialDto;
        next();
    });
}
