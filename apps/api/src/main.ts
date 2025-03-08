import { Elysia } from 'elysia';

import { swaggerConfig } from '@/config/swagger';
import { corsConfig } from '@/config/cors';
import { env } from '@/config/env';

import { healthController } from '@/controllers/health';
import { notesController } from './controllers/notes';

const api = new Elysia({
    prefix: '/api',
}).use(notesController);

const app = new Elysia()
    .use(swaggerConfig)
    .use(corsConfig)
    .use(healthController)
    .use(api)
    .listen(env.PORT);

const { hostname, port } = app.server || { hostname: 'localhost', port: 3000 };

console.log(`Server is running on http://${hostname}:${port}`);

export type App = typeof app;
