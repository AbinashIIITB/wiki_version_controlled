import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000');

export const joinDocument = (documentId: number | string) => {
    socket.emit('joinDocument', documentId);
};

export const leaveDocument = (documentId: number | string) => {
    socket.emit('leaveDocument', documentId);
};

export const onDocumentUpdate = (callback: (data: any) => void) => {
    socket.on('documentUpdated', callback);
};

export const onUserJoined = (callback: (data: any) => void) => {
    socket.on('userJoined', callback);
};

export const onUserLeft = (callback: (data: any) => void) => {
    socket.on('userLeft', callback);
};

export const sendMessage = (message: any) => {
    socket.emit('sendMessage', message);
};

export const onMessageReceived = (callback: (data: any) => void) => {
    socket.on('messageReceived', callback);
};

export const disconnectSocket = () => {
    socket.disconnect();
};