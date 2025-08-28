import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000');

export const joinDocument = (documentId) => {
    socket.emit('joinDocument', documentId);
};

export const leaveDocument = (documentId) => {
    socket.emit('leaveDocument', documentId);
};

export const onDocumentUpdate = (callback) => {
    socket.on('documentUpdated', callback);
};

export const onUserJoined = (callback) => {
    socket.on('userJoined', callback);
};

export const onUserLeft = (callback) => {
    socket.on('userLeft', callback);
};

export const sendMessage = (message) => {
    socket.emit('sendMessage', message);
};

export const onMessageReceived = (callback) => {
    socket.on('messageReceived', callback);
};

export const disconnectSocket = () => {
    socket.disconnect();
};