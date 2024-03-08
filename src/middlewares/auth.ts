import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import User from '@/models/User';


const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const { userId } = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

const authenticateApiKey = async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key']; // Assuming API key is sent in the header

    if (!apiKey) {
        return res.status(401).json({ message: 'Missing API key' });
    }

    User.findOne({ apiKey })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Invalid API key' });
            }
            req.user = user; // Attach the user object to the request for further use
            next();
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' }); // Generic error for security
        });
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const apiKey = req.headers['x-api-key'];

    // Prioritize token authentication
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            const { userId } = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
            const user = User.findById(userId);
            if (user) {
                req.user = user;
                return next();
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Fallback to API key authentication
    if (apiKey) {
        return User.findOne({ apiKey })
            .then(user => {
                if (user) {
                    req.user = user;
                    return next();
                }
                return res.status(401).json({ message: 'Invalid API key' });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).json({ message: 'Internal server error' });
            });
    }
};

export { authenticateToken, authenticateApiKey, authenticate };