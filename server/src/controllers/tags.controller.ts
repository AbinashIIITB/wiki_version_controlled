import { Request, Response } from 'express';
import Tag from '../models/Tag';

// Create a new tag
export const createTag = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newTag = await Tag.create({ name });
        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).json({ message: 'Error creating tag', error });
    }
};

// Get all tags
export const getTags = async (req: Request, res: Response) => {
    try {
        const tags = await Tag.findAll();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tags', error });
    }
};

// Update a tag
export const updateTag = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const [updated] = await Tag.update({ name }, { where: { id } });
        if (updated) {
            const updatedTag = await Tag.findOne({ where: { id } });
            res.status(200).json(updatedTag);
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating tag', error });
    }
};

// Delete a tag
export const deleteTag = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Tag.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Tag not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tag', error });
    }
};