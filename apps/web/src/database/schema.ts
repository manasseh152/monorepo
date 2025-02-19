import type { NoteId, UserId } from '@/database/utils';

export type SystemFields = {
    createdAt: number;
    updatedAt: number | null;
    deletedAt: number | null;
};

export type User = {
    userId: UserId;
    username: string;
    email: string;
} & SystemFields;

export type UserInsert = Omit<User, 'userId' | keyof SystemFields>;

export type Note = {
    noteId: NoteId;
    title: string;
    content: string;
} & SystemFields;

export type NoteInsert = Omit<Note, 'noteId' | keyof SystemFields>;
