import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ message: 'Login please ! ' });
            return;
        }
        const decoded = jwt.verify(token, process.env.USER_JWT_SECRET as string) as { email: string, role: string };

        req.email = decoded.email;
        req.role = decoded.role;
        next();


    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
        return;
    }
}



