import Dexie, { type Table } from 'dexie';

export class Database extends Dexie {
    public readonly example: Table<{ id: number; name: string }>;

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
            example: '++id, name',
        });

        this.example = this.table('example');
    }
}

export const db = new Database();
