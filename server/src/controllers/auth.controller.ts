import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
    try {
        const user = await AuthService.register(req.body);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { token, user } = await AuthService.login(req.body);
        res.status(200).json({ token, user });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
};

export const logout = async (req: any, res: Response) => {
    try {
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getCurrentUser = async (req: any, res: Response) => {
    res.status(200).json(req.user);
};