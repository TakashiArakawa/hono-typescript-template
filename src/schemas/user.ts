import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  age: z.number().int().min(0, 'Age must be a positive integer').optional(),
});

export const userCreateSchema = userSchema.omit({ id: true });
export const userUpdateSchema = userCreateSchema.partial();
