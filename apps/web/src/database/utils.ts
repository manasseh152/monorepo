import { randomUUID, type UUID } from 'crypto';

export function generateUUID(): UUID {
    return randomUUID();
}

export type TagId = UUID & { readonly brand: unique symbol };
export const TagId = (id: UUID) => id as TagId;

export type NoteId = UUID & { readonly brand: unique symbol };
export const NoteId = (id: UUID) => id as NoteId;
