import type { App } from '@repo/api';

import { treaty } from '@elysiajs/eden';

import { env } from '@/config/env';

export const client = treaty<App>(env.VITE_API_BASE_URL);
