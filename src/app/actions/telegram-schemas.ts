import { z } from 'zod';

export const ClickDataSchema = z.object({
  serviceName: z.string(),
  serviceLink: z.string(),
});

export type ClickData = z.infer<typeof ClickDataSchema>;
