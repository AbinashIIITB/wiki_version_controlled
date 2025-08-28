import { Request, Response } from 'express';
import Version from '../models/Version';
import Document from '../models/Document';

// Create a new version
export const createVersion = async (req: Request, res: Response) => {
    try {
        const { documentId, content, author } = req.body;
        const document = await Document.findByPk(documentId);

        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        const version = await Version.create({ documentId, content, author });
        return res.status(201).json(version);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating version', error });
    }
};

// Get all versions of a document
export const getVersions = async (req: Request, res: Response) => {
    try {
        const { documentId } = req.params;
        const versions = await Version.findAll({ where: { documentId } });
        return res.status(200).json(versions);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching versions', error });
    }
};

// Get a specific version
export const getVersion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const version = await Version.findByPk(id);

        if (!version) {
            return res.status(404).json({ message: 'Version not found' });
        }

        return res.status(200).json(version);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching version', error });
    }
};

// Delete a version
export const deleteVersion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const version = await Version.findByPk(id);

        if (!version) {
            return res.status(404).json({ message: 'Version not found' });
        }

        await version.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting version', error });
    }
};