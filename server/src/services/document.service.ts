import { Document } from '../models/Document';
import { Version } from '../models/Version';
import { Comment } from '../models/Comment';
import { Tag } from '../models/Tag';
import { User } from '../models/User';

export const createDocument = async (data) => {
    const document = await Document.create(data);
    return document;
};

export const getDocumentById = async (id) => {
    const document = await Document.findByPk(id);
    return document;
};

export const updateDocument = async (id, data) => {
    await Document.update(data, { where: { id } });
    const updatedDocument = await getDocumentById(id);
    return updatedDocument;
};

export const deleteDocument = async (id) => {
    await Document.destroy({ where: { id } });
};

export const getDocumentVersions = async (documentId) => {
    const versions = await Version.findAll({ where: { documentId } });
    return versions;
};

export const addCommentToDocument = async (documentId, commentData) => {
    const comment = await Comment.create({ ...commentData, documentId });
    return comment;
};

export const getCommentsForDocument = async (documentId) => {
    const comments = await Comment.findAll({ where: { documentId } });
    return comments;
};

export const addTagsToDocument = async (documentId, tagIds) => {
    const document = await Document.findByPk(documentId);
    await document.setTags(tagIds);
};

export const getTagsForDocument = async (documentId) => {
    const document = await Document.findByPk(documentId, { include: Tag });
    return document.Tags;
};