import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { token, user } = await AuthService.login(req.body);
            res.status(200).json({ token, user });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            await AuthService.logout(req.user.id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCurrentUser(req: Request, res: Response) {
        res.status(200).json(req.user);
    }
}

export default new AuthController();