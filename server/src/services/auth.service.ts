import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import Role from '../models/Role';

const authService = {
    register: async (userData: any) => {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await User.create({ ...userData, password: hashedPassword });
        return user;
    },

    login: async (email: string, password: string) => {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    },

    getUserById: async (id: number) => {
        return await User.findByPk(id);
    },

    getAllUsers: async () => {
        return await User.findAll({ include: Role });
    },

    updateUser: async (id: number, userData: any) => {
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');
        return await user.update(userData);
    },

    deleteUser: async (id: number) => {
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');
        await user.destroy();
        return { message: 'User deleted successfully' };
    }
};

export default authService;