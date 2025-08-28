import { Request, Response } from 'express';
import Comment from '../models/Comment';
import { validateComment } from '../validators/comment.schema';

// Create a new comment
export const createComment = async (req: Request, res: Response) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const comment = new Comment({
        documentId: req.body.documentId,
        userId: req.user.id,
        content: req.body.content,
        createdAt: new Date(),
    });

    try {
        const savedComment = await comment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get comments for a document
export const getComments = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find({ documentId: req.params.documentId }).populate('userId', 'username');
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a comment
export const updateComment = async (req: Request, res: Response) => {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedComment) return res.status(404).send('Comment not found');
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) return res.status(404).send('Comment not found');
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};