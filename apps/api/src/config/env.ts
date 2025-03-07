import 'dotenv/config';
import { z } from 'zod';

export const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    DATABASE_URL: z.string(),
    PORT: z.coerce.number(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
