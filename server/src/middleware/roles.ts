import { Request, Response, NextFunction } from 'express';
import { Role } from '../models/Role';

export const authorize = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRole = req.user.role; // Assuming req.user is populated with user info
            if (!roles.includes(userRole)) {
                return res.status(403).json({ message: 'Access denied' });
            }
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
};

export const adminOnly = authorize(['Admin']);
export const editorOnly = authorize(['Admin', 'Editor']);
export const viewerOnly = authorize(['Admin', 'Editor', 'Viewer']);