import { Elysia } from 'elysia';

import { swaggerConfig } from '@/config/swagger';
import { corsConfig } from '@/config/cors';
import { env } from '@/config/env';

import { health } from '@/controllers/health';

const app = new Elysia()
    .use(swaggerConfig)
    .use(corsConfig)
    .use(health)
    .listen(env.PORT);

const { hostname, port } = app.server || { hostname: 'localhost', port: 3000 };

console.log(`Server is running on http://${hostname}:${port}`);

export type App = typeof app;
