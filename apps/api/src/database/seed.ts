import { faker } from '@faker-js/faker';

import {
    noteTable,
    noteTagTable,
    tagTable,
    type InsertNote,
    type InsertNoteTag,
    type InsertTag,
    type SelectNote,
    type SelectTag,
} from './schema';
import { db } from '.';

export function generateMockNotes({
    amount = 10,
}: {
    amount?: number;
}): InsertNote[] {
    return Array.from({ length: amount }, () => ({
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
    }));
}

export function generateMockTags({
    amount = 10,
}: {
    amount?: number;
}): InsertTag[] {
    return Array.from({ length: amount }, () => ({
        name: faker.lorem.word(),
    }));
}

export function linkTagsToNote({
    note,
    tags,
}: {
    note: SelectNote;
    tags: SelectTag[];
}): InsertNoteTag[] {
    return tags.map((tag) => ({
        note_id: note.id,
        tag_id: tag.id,
    }));
}

export async function seedDatabase({
    notesAmount = 10,
    tagsAmount = 10,
}: {
    notesAmount?: number;
    tagsAmount?: number;
}): Promise<void> {
    const mockNotes = generateMockNotes({ amount: notesAmount });
    const mockTags = generateMockTags({ amount: tagsAmount });

    const [notes, tags] = await Promise.all([
        db.insert(noteTable).values(mockNotes).returning().execute(),
        db.insert(tagTable).values(mockTags).returning().execute(),
    ]);

    const noteTages = notes.flatMap((note) => {
        const amount = Math.floor(Math.random() * tags.length);

        const selectedTags = tags.slice(0, amount);
        const noteTags = linkTagsToNote({
            note,
            tags: selectedTags,
        });

        return noteTags;
    });

    await db.insert(noteTagTable).values(noteTages).execute();
}

seedDatabase({ notesAmount: 10, tagsAmount: 10 }).then(() => {
    console.log('Database seeded');
});
