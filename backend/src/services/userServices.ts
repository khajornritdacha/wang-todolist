import { Request, Response } from 'express';
import { User } from '../models/User';

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { CredentialDto } from '../models/dto';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'local'}` });
const saltRounds = 10;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'SECRET';

const generateAccessToken = (user: CredentialDto) => {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, {
        expiresIn: '30 days',
    });
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .send({ message: 'Please fill email and password' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user)
        return res.status(400).send({ message: 'No user with this email' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send({ message: 'Password is wrong' });

    // Send access token and refresh token
    const accessToken = generateAccessToken({ email: user.email });

    return res.status(200).json({ accessToken });
};

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .send({ message: 'Please fill email and password' });
    }

    // Check existing account
    let user = await User.findOne({ email });
    if (user) return res.status(400).send({ message: 'email is used' });

    // Create new account
    // Hashing password first
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user = new User({ email, password: hashedPassword, tasks: [] });
    await user.save();

    res.sendStatus(201);
};
