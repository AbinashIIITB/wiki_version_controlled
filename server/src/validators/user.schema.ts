import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const UserSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(3, 'Username must be at least 3 characters long').max(30),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  roleId: z.number().optional(),
});

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const result = UserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: result.error.errors[0].message });
  }
  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const LoginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  });
  const result = LoginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: result.error.errors[0].message });
  }
  next();
};