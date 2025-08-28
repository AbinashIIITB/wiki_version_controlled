import { z } from 'zod';

export const DocumentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  authorId: z.number().int().positive('Author ID must be a positive integer'),
});

export const DocumentUpdateSchema = DocumentSchema.partial().extend({
  id: z.number().int().positive('Document ID must be a positive integer').required(),
});

export type Document = z.infer<typeof DocumentSchema>;
export type DocumentUpdate = z.infer<typeof DocumentUpdateSchema>;