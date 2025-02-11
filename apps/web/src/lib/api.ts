import { treaty } from '@elysiajs/eden';

import type { App } from '@repo/api';

export const client = treaty<App>('localhost:3000');
