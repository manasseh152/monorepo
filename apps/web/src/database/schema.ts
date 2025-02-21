import type { NoteId, TagId } from '@/database/utils';

export type SystemFields = {
    createdAt: number;
    updatedAt: number | null;
    deletedAt: number | null;
};

export type SystemFieldKeys = keyof SystemFields;

export type Tag = {
    tagId: TagId;
    name: string;
} & SystemFields;

export type TagInsert = Omit<Tag, SystemFieldKeys | 'tagId'>;

export type Note = {
    noteId: NoteId;
    title: string;
    content: string;
    tags: Tag[];
} & SystemFields;

export type NoteInsert = Omit<Note, SystemFieldKeys | 'noteId'>;
