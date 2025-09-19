import { z } from 'zod';

export const ClickDataSchema = z.object({
  serviceName: z.string(),
  serviceLink: z.string(),
  userId: z.number().optional(),
  username: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type ClickData = z.infer<typeof ClickDataSchema>;
