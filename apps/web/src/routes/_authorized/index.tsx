import { createFileRoute } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';

import { useCurrentUser } from '@/lib/authentication';
import { db } from '@/database';
import { useNoteForm } from '@/forms/create-note';

export const Route = createFileRoute('/_authorized/')({
    component: RouteComponent,
});

function RouteComponent() {
    const currentUser = useCurrentUser(true);

    const notes = useLiveQuery(
        () => db.notes.where({ createdBy: currentUser.userId }).toArray(),
        [currentUser.userId],
    );

    return (
        <section className="p-4">
            <h2 className="text-xl font-bold mb-2">Your Notes</h2>
            <CreateNote />
            <ul className="flex flex-col gap-4">
                {notes?.map((note) => (
                    <li key={note.noteId}>
                        <h3>{note.title}</h3>
                        <pre>{note.content}</pre>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function CreateNote() {
    const { Field, handleSubmit } = useNoteForm({
        onSuccess: () => {
            alert('Note created');
        },
        onFail: (error) => {
            alert(error.message);
        },
    });

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleSubmit();
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
            <Field name="title">
                {({ state, handleBlur, handleChange }) => (
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                )}
            </Field>
            <Field name="content">
                {({ state, handleBlur, handleChange }) => (
                    <textarea
                        name="content"
                        placeholder="Content"
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        rows={5}
                        value={state.value}
                        onBlur={handleBlur}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                )}
            </Field>
            <button
                type="submit"
                className="h-10 w-full rounded-md border border-input bg-primary font-medium text-base hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
                Create Note
            </button>
        </form>
    );
}
