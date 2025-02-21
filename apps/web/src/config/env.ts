import { z } from 'zod';

export const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    VITE_DEV_SERVER_HOST: z.string().default('localhost'),
    VITE_DEV_SERVER_PORT: z.coerce.number().default(5173),
    VITE_APP_BASE_URL: z.string().url().default('https://local.bitbreeze.nl'),
    VITE_API_BASE_URL: z
        .string()
        .url()
        .default('https://local.bitbreeze.nl/api'),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(import.meta.env ?? {});
