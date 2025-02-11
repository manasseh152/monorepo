import Dexie, { type Table } from 'dexie';

import type { NoteId, UserId } from '@/database/utils';
import type { Note, User } from '@/database/schema';

export class Database extends Dexie {
    users: Table<User, UserId>;
    notes: Table<Note, NoteId>;

    /**
     * # Schema Syntax
     * - **`++`** is an auto-incremented primary key
     * - **`&`** is a unique index
     * - **`*`** is a multi-entry index
     * - **`[id1+id2]`** is a compound primary key
     *
     * > NOTE: Don’t declare all columns like in SQL. You only declare properties you want to index, that is properties you want to use in a where(…) query.
     */
    constructor() {
        super('Database');

        this.version(1).stores({
            users: '&userId, username, email, createdAt, createdBy, updatedAt, updatedBy, deletedAt, deletedBy',
            notes: '&noteId, title, content, createdAt, createdBy, updatedAt, updatedBy, deletedAt, deletedBy',
        });

        this.users = this.table('users');
        this.notes = this.table('notes');
    }
}

export const db = new Database();
