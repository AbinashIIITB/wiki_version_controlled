export interface User {
    id: number;
    username: string;
    email: string;
    role: Role;
}

export interface Role {
    id: number;
    name: string;
}

export interface Document {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: number;
}

export interface Version {
    id: number;
    documentId: number;
    content: string;
    createdAt: Date;
    authorId: number;
}

export interface Comment {
    id: number;
    documentId: number;
    content: string;
    createdAt: Date;
    authorId: number;
    parentId?: number; // For threaded comments
}

export interface Tag {
    id: number;
    name: string;
}

export interface Notification {
    id: number;
    userId: number;
    message: string;
    createdAt: Date;
    read: boolean;
}

export interface Analytics {
    documentId: number;
    views: number;
    edits: number;
    topContributors: User[];
}

export interface AuditLog {
    id: number;
    userId: number;
    action: string;
    timestamp: Date;
}

export interface DocumentLink {
    id: number;
    sourceDocumentId: number;
    targetDocumentId: number;
}