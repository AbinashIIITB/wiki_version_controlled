import { Comment } from '../models/Comment';
import { Document } from '../models/Document';

export const createComment = async (documentId: number, userId: number, content: string) => {
    const newComment = await Comment.create({
        documentId,
        userId,
        content,
        createdAt: new Date(),
    });
    return newComment;
};

export const getCommentsByDocumentId = async (documentId: number) => {
    const comments = await Comment.findAll({
        where: { documentId },
        include: [{ model: User, attributes: ['id', 'username'] }],
        order: [['createdAt', 'ASC']],
    });
    return comments;
};

export const updateComment = async (commentId: number, content: string) => {
    const updatedComment = await Comment.update(
        { content },
        { where: { id: commentId } }
    );
    return updatedComment;
};

export const deleteComment = async (commentId: number) => {
    const result = await Comment.destroy({
        where: { id: commentId },
    });
    return result;
};