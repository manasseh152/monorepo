import Dexie, { type Table } from 'dexie';

import type { NoteId } from '@/database/utils';
import type { Note } from '@/database/schema';

export class Database extends Dexie {
    public notes: Table<Note, NoteId>;

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
            notes: '&noteId, title, content, createdAt, updatedAt, deletedAt',
        });

        this.notes = this.table('notes');
    }
}

export const db = new Database();
