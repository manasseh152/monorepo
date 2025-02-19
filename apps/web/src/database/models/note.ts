import type { Note, NoteInsert } from '@/database/schema';

import { NoteId, generateUUID } from '@/database/utils';
import { db } from '@/database';

export async function createNote(note: NoteInsert): Promise<Note> {
    const noteId = NoteId(generateUUID());
    const createdAt = Date.now();

    const newNote: Note = {
        noteId,
        ...note,
        createdAt,
        updatedAt: null,
        deletedAt: null,
    };

    await db.notes.add(newNote);

    return newNote;
}

export async function getNote(noteId: NoteId): Promise<Note | undefined> {
    return db.notes.get(noteId);
}

export async function getNotes(): Promise<Note[]> {
    return db.notes.toArray();
}

export async function updateNote(
    noteId: NoteId,
    note: Partial<NoteInsert>,
): Promise<Note> {
    const updatedAt = Date.now();

    await db.notes.update(noteId, {
        ...note,
        updatedAt,
    });

    return db.notes.get(noteId) as Promise<Note>;
}

export async function deleteNote(noteId: NoteId): Promise<void> {
    await db.notes.delete(noteId);
}

export async function deleteAllNotes(): Promise<void> {
    await db.notes.clear();
}
