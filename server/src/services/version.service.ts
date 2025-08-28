import { Version } from '../models/Version';
import { Document } from '../models/Document';

export class VersionService {
    async createVersion(documentId: number, content: string, authorId: number): Promise<Version> {
        const version = await Version.create({
            documentId,
            content,
            authorId,
            createdAt: new Date(),
        });
        return version;
    }

    async getVersionsByDocumentId(documentId: number): Promise<Version[]> {
        return await Version.findAll({
            where: { documentId },
            order: [['createdAt', 'DESC']],
        });
    }

    async getVersionById(versionId: number): Promise<Version | null> {
        return await Version.findByPk(versionId);
    }

    async deleteVersion(versionId: number): Promise<void> {
        await Version.destroy({
            where: { id: versionId },
        });
    }

    async restoreVersion(versionId: number, documentId: number): Promise<Document> {
        const version = await this.getVersionById(versionId);
        if (!version) {
            throw new Error('Version not found');
        }

        const document = await Document.findByPk(documentId);
        if (!document) {
            throw new Error('Document not found');
        }

        document.content = version.content;
        await document.save();
        return document;
    }
}