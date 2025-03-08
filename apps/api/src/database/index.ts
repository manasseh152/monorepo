import { drizzle } from 'drizzle-orm/postgres-js';

import { env } from '@/config/env';

import * as schema from './schema';

export const db = drizzle(env.DATABASE_URL, { schema });
