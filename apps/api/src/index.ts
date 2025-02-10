import { Elysia } from 'elysia';

const app = new Elysia().get('/', () => 'Hello Elysia').listen(3000);

export type App = typeof app;

console.log(
    `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
