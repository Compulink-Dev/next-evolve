import { z } from 'zod';

export const sponsorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  link: z.string().url('Invalid URL'),
  type: z.enum(['sponsor', 'endorsement', 'media']),
  imageUrl: z.string().url('Image URL must be valid'),
});

export type SponsorInput = z.infer<typeof sponsorSchema>;
