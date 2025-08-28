import { Document } from '../models/Document';
import { Version } from '../models/Version';
import { User } from '../models/User';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { PDFDocument } from 'pdf-lib';

const streamPipeline = promisify(pipeline);

export const exportDocumentAsMarkdown = async (documentId: string, userId: string) => {
    const document = await Document.findById(documentId);
    if (!document) throw new Error('Document not found');

    const content = `# ${document.title}\n\n${document.content}`;
    const filePath = join(__dirname, `../../exports/${document.title}.md`);
    const writeStream = createWriteStream(filePath);

    await streamPipeline(
        Buffer.from(content),
        writeStream
    );

    return filePath;
};

export const exportDocumentAsPDF = async (documentId: string, userId: string) => {
    const document = await Document.findById(documentId);
    if (!document) throw new Error('Document not found');

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(`Title: ${document.title}\n\n${document.content}`, {
        x: 50,
        y: page.getHeight() - 50,
        size: 12,
    });

    const pdfBytes = await pdfDoc.save();
    const filePath = join(__dirname, `../../exports/${document.title}.pdf`);
    await createWriteStream(filePath).write(pdfBytes);

    return filePath;
};