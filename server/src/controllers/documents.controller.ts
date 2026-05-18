import { Request, Response } from 'express';
import * as documentService from '../services/document.service';

export const createDocument = async (req: any, res: Response) => {
    try {
        const doc = await documentService.createDocument({
            title: req.body.title,
            content: req.body.content,
            authorId: req.user?.id || 1, // Populate author from authenticated token
        });
        res.status(201).json(doc);
    } catch (error: any) {
        res.status(500).json({ message: 'Error creating document', error: error.message });
    }
};

export const getDocument = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const doc = await documentService.getDocumentById(id);
        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(doc);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching document', error: error.message });
    }
};

export const updateDocument = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const doc = await documentService.updateDocument(id, req.body);
        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(doc);
    } catch (error: any) {
        res.status(500).json({ message: 'Error updating document', error: error.message });
    }
};

export const deleteDocument = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        await documentService.deleteDocument(id);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting document', error: error.message });
    }
};

export const getAllDocuments = async (req: Request, res: Response) => {
    try {
        const docs = await documentService.getAllDocuments();
        res.status(200).json(docs);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching documents', error: error.message });
    }
};

export const getDocumentVersions = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const versions = await documentService.getDocumentVersions(id);
        res.status(200).json(versions);
    } catch (error: any) {
        res.status(500).json({ message: 'Error fetching versions', error: error.message });
    }
};