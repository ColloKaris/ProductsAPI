import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z
      .string({ required_error: 'Description is required' })
      .min(120, 'Description should be at least 120 characters long'),
    price: z.number({required_error: 'Price is required'}),
    image: z.string({required_error: "Image is required"})
  }),
});
