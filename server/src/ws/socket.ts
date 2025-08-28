import { Server } from 'socket.io';
import { createServer } from 'http';

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinDocument', (documentId) => {
        socket.join(documentId);
        console.log(`User ${socket.id} joined document ${documentId}`);
    });

    socket.on('editDocument', (data) => {
        const { documentId, content } = data;
        socket.to(documentId).emit('documentUpdated', content);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

export default httpServer;