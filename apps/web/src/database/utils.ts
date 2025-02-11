export function generateUUID() {
    return crypto.randomUUID();
}

export type UUID = ReturnType<typeof generateUUID>;

export type UserId = UUID & { readonly brand: unique symbol };
export const UserId = (id: string) => id as UserId;

export type NoteId = UUID & { readonly brand: unique symbol };
export const NoteId = (id: string) => id as NoteId;
