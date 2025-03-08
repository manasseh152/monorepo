import { Elysia, t } from 'elysia';

export const healthController = new Elysia({
    prefix: '/health',
})
    .model({
        healthStatusResponse: t.Object({
            status: t.Literal('ok'),
            message: t.Literal('Server is running'),
        }),
    })
    .get(
        '/',
        () =>
            ({
                status: 'ok',
                message: 'Server is running',
            }) as const,
        {
            response: {
                200: 'healthStatusResponse',
            },
        },
    );
