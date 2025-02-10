import { treaty } from '@elysiajs/eden';

import type { App } from '@repo/api';

const client = treaty<App>('localhost:3000');
