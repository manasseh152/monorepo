import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

import { createNote } from '@/database/models/note';

export const noteSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(3),
});

export type NoteForm = z.infer<typeof noteSchema>;

export const useNoteForm = ({
    onSuccess,
    onFail,
}: {
    onSuccess: () => void;
    onFail: (error: Error) => void;
}) =>
    useForm<NoteForm>({
        defaultValues: {
            title: '',
            content: '',
        },
        validators: {
            onChange: noteSchema,
        },
        onSubmit: async ({ value }) => {
            try {
                await createNote({
                    title: value.title,
                    content: value.content,
                });

                onSuccess();
            } catch (error) {
                onFail(error as Error);
            }
        },
    });
