import { Request, Response } from 'express';
import { Comment, User } from '../models';
import { validateComment } from '../validators/comment.schema';

// Create a new comment
export const createComment = async (req: any, res: Response) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const savedComment = await Comment.create({
            documentId: req.body.documentId,
            userId: req.user.id, // Populated by auth middleware
            content: req.body.content,
        });
        res.status(201).json(savedComment);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Get comments for a document
export const getComments = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.findAll({
            where: { documentId: req.params.documentId },
            include: [{ model: User, attributes: ['id', 'username'] }]
        });
        res.status(200).json(comments);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Update a comment
export const updateComment = async (req: Request, res: Response) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const [updated] = await Comment.update(
            { content: req.body.content },
            { where: { id: req.params.id } }
        );
        if (!updated) return res.status(404).send('Comment not found');
        const updatedComment = await Comment.findByPk(req.params.id);
        res.status(200).json(updatedComment);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
    try {
        const deleted = await Comment.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).send('Comment not found');
        res.status(204).send();
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export { createComment as addComment };