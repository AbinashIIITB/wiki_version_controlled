import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, Role } from '../models';

const authService = {
    register: async (userData: any) => {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        // Default role is 3 (Viewer) if not specified
        const roleId = userData.roleId || 3;
        const user = await User.create({
            username: userData.username,
            password: hashedPassword,
            roleId,
        });
        return user;
    },

    login: async (loginData: any) => {
        const { username, password } = loginData;
        const user = await User.findOne({
            where: { username },
            include: [Role]
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        const roleName = (user as any).Role?.name || 'Viewer';
        const token = jwt.sign(
            { id: user.id, username: user.username, role: roleName },
            process.env.JWT_SECRET || 'jwt_secret_fallback',
            { expiresIn: '1h' }
        );

        return { user, token };
    },

    getUserById: async (id: number) => {
        return await User.findByPk(id, { include: [Role] });
    },

    getAllUsers: async () => {
        return await User.findAll({ include: [Role] });
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
export { authService as AuthService }; // Export both default and named to prevent import bugs!