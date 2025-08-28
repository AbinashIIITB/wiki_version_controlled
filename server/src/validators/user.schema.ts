import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number().optional(),
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['Admin', 'Editor', 'Viewer']).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;