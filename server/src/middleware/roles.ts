import { Request, Response, NextFunction } from 'express';

export const authorize = (roles: string[] | string, ...moreRoles: string[]) => {
    const rolesArray = Array.isArray(roles) ? roles : [roles, ...moreRoles];
    return async (req: any, res: Response, next: NextFunction) => {
        try {
            const userRole = req.user?.role; // Assuming req.user is populated with user info
            if (!rolesArray.includes(userRole)) {
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