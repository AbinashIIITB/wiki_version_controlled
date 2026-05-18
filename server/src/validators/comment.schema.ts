import { z } from 'zod';

export const CommentSchema = z.object({
  documentId: z.number().int().positive('Document ID must be a positive integer'),
  content: z.string().min(1, 'Comment content cannot be empty'),
});

export const validateComment = (data: any) => {
  const result = CommentSchema.safeParse(data);
  if (!result.success) {
    return {
      error: {
        details: result.error.errors.map(err => ({ message: err.message })),
      },
    };
  }
  return { error: null, value: result.data };
};
export default validateComment;
