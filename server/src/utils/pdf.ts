import { Document, Packer, Paragraph, TextRun } from 'docx';
import { Response } from 'express';

export const generatePDF = async (content: string, res: Response) => {
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: content,
                            bold: true,
                        }),
                    ],
                }),
            ],
        }],
    });

    const buffer = await Packer.toBuffer(doc);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
    res.send(buffer);
};