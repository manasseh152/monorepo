/*
 * This file is currently empty.
 * Please refer to Drizzle ORM documentation at:
 * https://orm.drizzle.team/docs/sql-schema-declaration#shape-your-data-schema
 * for schema definition guidelines.
 *
 * Other links:
 * - https://orm.drizzle.team/docs/column-types/pg
 * - https://orm.drizzle.team/docs/indexes-constraints
 * - https://orm.drizzle.team/docs/views
 * - https://orm.drizzle.team/docs/schemas
 * - https://orm.drizzle.team/docs/extensions/pg
 * - https://orm.drizzle.team/docs/relations
 */

import { relations } from 'drizzle-orm';
import {
    serial,
    text,
    varchar,
    timestamp,
    integer,
    pgTable,
} from 'drizzle-orm/pg-core';

/*
CREATE TABLE notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE note_tags (
    note_id INT,
    tag_id INT,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

-- Optional indexes for better performance
CREATE INDEX idx_notes_title ON notes(title);
CREATE INDEX idx_tags_name ON tags(name);
*/

// Schema definition

export const noteTable = pgTable('note', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    deleted_at: timestamp('deleted_at'),
});

export type SelectNote = typeof noteTable.$inferSelect;
export type InsertNote = typeof noteTable.$inferInsert;

export const tagTable = pgTable('tag', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
});

export type SelectTag = typeof tagTable.$inferSelect;
export type InsertTag = typeof tagTable.$inferInsert;

export const noteTagTable = pgTable('note_tag', {
    id: serial('id').primaryKey(),
    note_id: integer('note_id')
        .notNull()
        .references(() => noteTable.id),
    tag_id: integer('tag_id')
        .notNull()
        .references(() => tagTable.id),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
    deleted_at: timestamp('deleted_at'),
});

export type SelectNoteTag = typeof noteTagTable.$inferSelect;
export type InsertNoteTag = typeof noteTagTable.$inferInsert;

// Relations

export const noteRelations = relations(noteTable, ({ many }) => ({
    tags: many(tagTable),
}));

export const tagRelations = relations(tagTable, ({ many }) => ({
    notes: many(noteTable),
}));

export const noteTagRelations = relations(noteTagTable, ({ one }) => ({
    note: one(noteTable),
    tag: one(tagTable),
}));
