import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password too short- should be 6 chars minimum'),
    passwordConfirmation: z.string().optional(),
    email: z.string({
      required_error: 'Email is required'
    }).email('Not a valid email')
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>
