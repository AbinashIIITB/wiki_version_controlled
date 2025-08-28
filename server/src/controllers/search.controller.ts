import { Request, Response } from 'express';
import { searchDocuments } from '../services/search.service';

export const searchController = async (req: Request, res: Response) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        const results = await searchDocuments(query as string);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred while searching', error });
    }
};