import { Document, Version, Comment, Tag, User } from '../models';

export const createDocument = async (data: any) => {
    const document = await Document.create(data);
    return document;
};

export const getDocumentById = async (id: number) => {
    const document = await Document.findByPk(id);
    return document;
};

export const updateDocument = async (id: number, data: any) => {
    await Document.update(data, { where: { id } });
    const updatedDocument = await getDocumentById(id);
    return updatedDocument;
};

export const deleteDocument = async (id: number) => {
    await Document.destroy({ where: { id } });
};

export const getDocumentVersions = async (documentId: number) => {
    const versions = await Version.findAll({ where: { documentId } });
    return versions;
};

export const addCommentToDocument = async (documentId: number, commentData: any) => {
    const comment = await Comment.create({ ...commentData, documentId });
    return comment;
};

export const getCommentsForDocument = async (documentId: number) => {
    const comments = await Comment.findAll({ where: { documentId } });
    return comments;
};

export const addTagsToDocument = async (documentId: number, tagIds: number[]) => {
    const document = await Document.findByPk(documentId);
    if (!document) throw new Error('Document not found');
    await (document as any).setTags(tagIds);
};

export const getTagsForDocument = async (documentId: number) => {
    const document = await Document.findByPk(documentId, { include: [Tag] });
    if (!document) return [];
    return (document as any).tags || [];
};

export const getAllDocuments = async () => {
    const documents = await Document.findAll();
    return documents;
};