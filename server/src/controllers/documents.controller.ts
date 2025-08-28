import { Request, Response } from 'express';
import Document from '../models/Document';
import Version from '../models/Version';
import Comment from '../models/Comment';
import { createDocument, updateDocument, getDocumentById, getAllDocuments, deleteDocument } from '../services/document.service';

// Create a new document
export const createNewDocument = async (req: Request, res: Response) => {
    try {
        const documentData = req.body;
        const newDocument = await createDocument(documentData);
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(500).json({ message: 'Error creating document', error });
    }
};

// Update an existing document
export const updateExistingDocument = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const documentData = req.body;
        const updatedDocument = await updateDocument(id, documentData);
        res.status(200).json(updatedDocument);
    } catch (error) {
        res.status(500).json({ message: 'Error updating document', error });
    }
};

// Get a document by ID
export const getDocument = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const document = await getDocumentById(id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching document', error });
    }
};

// Get all documents
export const getAllDocs = async (req: Request, res: Response) => {
    try {
        const documents = await getAllDocuments();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching documents', error });
    }
};

// Delete a document
export const deleteDoc = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await deleteDocument(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting document', error });
    }
};