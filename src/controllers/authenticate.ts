/**
 * Controller functions for user authentication.
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '@/models/User';

/**
 * Register a new user.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 * @returns A JSON response indicating the success of the registration.
 */
const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const user = new User({ email, password });
        await user.save();
        res.json({ message: 'Registration successful' });
    } catch (error) {
        next(error);
    }
};

/**
 * Login with an existing user.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 * @returns A JSON response containing a JWT token for the authenticated user.
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY as string, {
            expiresIn: '4 weeks'
        });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

export { register, login };