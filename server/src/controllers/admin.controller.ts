import { Request, Response } from 'express';
import { User } from '../models/User';
import { Role } from '../models/Role';
import { AuditLog } from '../models/AuditLog';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    const { username, email, role } = req.body;
    try {
        const newUser = await User.create({ username, email, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Update user role
export const updateUserRole = async (req: Request, res: Response) => {
    const { userId, role } = req.body;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            user.role = role;
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating user role', error });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            await user.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// Log admin actions
export const logAdminAction = async (action: string, userId: number) => {
    try {
        await AuditLog.create({ action, userId });
    } catch (error) {
        console.error('Error logging admin action', error);
    }
};