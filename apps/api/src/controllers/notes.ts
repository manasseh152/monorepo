import { Elysia, t } from 'elysia';

import { noteTable, noteTagTable } from '@/database/schema';
import { db } from '@/database';
import { and, eq } from 'drizzle-orm';

export const notesController = new Elysia({
    prefix: '/notes',
    tags: ['Notes'],
})
    .get('/', async () => {
        const notes = await db.query.noteTable.findMany({
            with: {
                tags: {
                    columns: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return notes;
    })
    .get(
        '/:noteId',
        async ({ params }) => {
            const note = await db.query.noteTable.findFirst({
                where: eq(noteTable.id, params.id),
                with: {
                    tags: {
                        columns: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });

            if (!note) {
                throw new Error('Note not found');
            }

            return note;
        },
        {
            params: t.Object({
                id: t.Numeric(),
            }),
        },
    )
    .post(
        '/',
        async ({ body }) => {
            const note = await db
                .insert(noteTable)
                .values(body)
                .returning()
                .execute();

            return note;
        },
        {
            body: t.Object({
                title: t.String(),
                content: t.String(),
            }),
        },
    )
    .guard({
        params: t.Object({
            noteId: t.Numeric(),
        }),
    })
    .put(
        '/:noteId',
        async ({ params, body }) => {
            const note = await db
                .update(noteTable)
                .set(body)
                .where(eq(noteTable.id, params.noteId))
                .returning()
                .execute();

            return note;
        },
        {
            body: t.Object({
                title: t.String(),
                content: t.String(),
            }),
        },
    )
    .patch(
        '/:noteId',
        async ({ params, body }) => {
            const note = await db
                .update(noteTable)
                .set(body)
                .where(eq(noteTable.id, params.noteId))
                .returning()
                .execute();

            return note;
        },
        {
            body: t.Object({
                title: t.Optional(t.String()),
                content: t.Optional(t.String()),
            }),
        },
    )
    .delete('/:noteId', async ({ params }) => {
        const note = await db
            .delete(noteTable)
            .where(eq(noteTable.id, params.noteId))
            .returning()
            .execute();

        return note;
    })
    .get('/:noteId/tags', async ({ params }) => {
        const tags = await db.query.noteTagTable.findMany({
            where: eq(noteTagTable.note_id, params.noteId),
            with: {
                tag: {
                    columns: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        return tags;
    })
    .post(
        '/:noteId/tags',
        async ({ params, body }) => {
            const noteTag = await db
                .insert(noteTagTable)
                .values({
                    note_id: params.noteId,
                    tag_id: body.tag_id,
                })
                .returning()
                .execute();

            return noteTag;
        },
        {
            body: t.Object({
                tag_id: t.Number(),
            }),
        },
    )
    .delete(
        '/:noteId/tags/:tagId',
        async ({ params }) => {
            const noteTag = await db
                .delete(noteTagTable)
                .where(
                    and(
                        eq(noteTagTable.note_id, params.noteId),
                        eq(noteTagTable.tag_id, params.tagId),
                    ),
                )
                .returning()
                .execute();

            return noteTag;
        },
        {
            params: t.Object({
                tagId: t.Numeric(),
            }),
        },
    );
