import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { sequelize, Role } from './models';
import routes from './routes';
import errorHandler from './middleware/error';
import env from './config/env';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(json());
app.use('/api', routes);
app.use(errorHandler);

const seedRoles = async () => {
    try {
        const roles = [
            { name: 'Admin', description: 'Has full access to all features and settings.' },
            { name: 'Editor', description: 'Can create, edit, and delete documents.' },
            { name: 'Viewer', description: 'Can view documents but cannot make changes.' },
        ];
        for (const role of roles) {
            await Role.findOrCreate({
                where: { name: role.name },
                defaults: { name: role.name, description: role.description }
            });
        }
        console.log('Seeded default roles successfully');
    } catch (error) {
        console.error('Error seeding roles:', error);
    }
};

const startServer = async () => {
    try {
        // Authenticate database connection
        await sequelize.authenticate();
        console.log('Connected to MySQL database via Sequelize');

        // Temporarily disable foreign key checks to allow sync of tables in any order
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        await sequelize.sync({ alter: true });
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('Database schemas synchronized successfully');

        // Seed default roles
        await seedRoles();

        // WebSocket connection logic for collaborative editing
        io.on('connection', (socket) => {
            console.log('A user connected:', socket.id);

            socket.on('joinDocument', (documentId) => {
                socket.join(documentId);
                console.log(`User ${socket.id} joined document ${documentId}`);
                socket.to(documentId).emit('userJoined', socket.id);
            });

            socket.on('leaveDocument', (documentId) => {
                socket.leave(documentId);
                console.log(`User ${socket.id} left document ${documentId}`);
                socket.to(documentId).emit('userLeft', socket.id);
            });

            socket.on('editDocument', (data) => {
                const { documentId, content } = data;
                socket.to(documentId).emit('documentUpdated', content);
            });

            socket.on('sendMessage', (data) => {
                const { documentId, message } = data;
                socket.to(documentId).emit('messageReceived', message);
            });

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });
        });

        // Start listening
        server.listen(env.PORT, () => {
            console.log(`Server is running on port ${env.PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();