import {
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from 'drizzle-orm/pg-core';

export const taskStatusEnum = pgEnum('task_status', ['open', 'closed']);
export const taskPriorityEnum = pgEnum('task_priority', [
    'low',
    'medium',
    'high',
]);

const sytemFields = {
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
    deletedAt: timestamp('deleted_at'),
};

export const noteTable = pgTable('note', {
    id: serial('note_id').primaryKey(),
    title: varchar('title', { length: 255 }),
    content: text('content').notNull(),
    ...sytemFields,
});

export const taskTable = pgTable('task', {
    id: serial('task_id').primaryKey(),
    title: varchar('title', { length: 255 }),
    content: text('content').notNull(),
    status: taskStatusEnum('status').default('open').notNull(),
    priority: taskPriorityEnum('priority').default('medium').notNull(),
    ...sytemFields,
});

export const tagTable = pgTable('tag', {
    id: serial('tag_id').primaryKey(),
    name: varchar('name', { length: 255 }),
    ...sytemFields,
});

export const noteTagTable = pgTable('note_tag', {
    noteTagId: serial('note_tag_id').primaryKey(),
    noteId: serial('note_id')
        .notNull()
        .references(() => noteTable.id),
    tagId: serial('tag_id')
        .notNull()
        .references(() => tagTable.id),
    ...sytemFields,
});

export const taskTagTable = pgTable('task_tag', {
    taskTagId: serial('task_tag_id').primaryKey(),
    taskId: serial('task_id')
        .notNull()
        .references(() => taskTable.id),
    tagId: serial('tag_id')
        .notNull()
        .references(() => tagTable.id),
    ...sytemFields,
});
