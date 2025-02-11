import type { User } from '@/database/schema';

import { useForm } from '@tanstack/react-form';
import { getDefaultStore } from 'jotai/vanilla';
import { z } from 'zod';

import { currentUserAtom } from '@/stores/current-user';
import { db } from '@/database';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const useLoginForm = ({
    onScuccess,
    onFail,
}: {
    onScuccess: (user: User) => void;
    onFail: (error: Error) => void;
}) =>
    useForm<LoginForm>({
        defaultValues: {
            email: '',
            password: '',
        },
        validators: {
            onChange: loginSchema,
        },
        onSubmit: async ({ value }) => {
            const store = getDefaultStore();

            const user = await db.users
                .where('email')
                .equals(value.email)
                .first();

            if (!user) {
                onFail(new Error('User not found'));
                return;
            }

            // TODO: Implement password checking

            store.set(currentUserAtom, user);

            onScuccess(user);
        },
    });
