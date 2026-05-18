import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User, Role, AuditLog } from '../models';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({ include: [Role] });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    try {
        const roleRecord = await Role.findOne({ where: { name: role || 'Viewer' } });
        const roleId = roleRecord ? roleRecord.id : 3;
        const hashedPassword = await bcrypt.hash(password || 'password123', 10);
        const newUser = await User.create({ username, password: hashedPassword, roleId });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Update user role
export const updateUserRole = async (req: Request, res: Response) => {
    const { userId, role } = req.body;
    try {
        const user = await User.findByPk(userId);
        if (user) {
            const roleRecord = await Role.findOne({ where: { name: role } });
            if (roleRecord) {
                (user as any).roleId = roleRecord.id;
                await user.save();
                res.status(200).json(user);
            } else {
                res.status(400).json({ message: 'Invalid role specified' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating user role', error: error.message });
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

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id, { include: [Role] });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user', error });
    }
};

// Update user details
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (role) {
            const roleRecord = await Role.findOne({ where: { name: role } });
            if (roleRecord) {
                (user as any).roleId = roleRecord.id;
            }
        }
        await user.save();
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Get all roles
export const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving roles', error });
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