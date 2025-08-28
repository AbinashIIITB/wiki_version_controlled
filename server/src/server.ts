import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { createConnection } from 'mysql2/promise';
import routes from './routes';
import { errorHandler } from './middleware/error';
import { env } from './config/env';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(json());
app.use(routes);
app.use(errorHandler);

const startServer = async () => {
    try {
        const connection = await createConnection({
            host: env.DB_HOST,
            user: env.DB_USER,
            database: env.DB_NAME,
            password: env.DB_PASSWORD,
        });
        console.log('Connected to MySQL database');

        server.listen(env.PORT, () => {
            console.log(`Server is running on http://localhost:${env.PORT}`);
        });

        // WebSocket connection
        io.on('connection', (socket) => {
            console.log('A user connected');
            socket.on('disconnect', () => {
                console.log('User disconnected');
            });
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

startServer();