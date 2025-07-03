import { z } from 'zod';
import { userSchema, userCreateSchema, userUpdateSchema } from '../schemas/user.js';

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
