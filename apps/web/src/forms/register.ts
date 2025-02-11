import type { User } from '@/database/schema';

import { useForm } from '@tanstack/react-form';
import { getDefaultStore } from 'jotai/vanilla';
import { z } from 'zod';

import { currentUserAtom } from '@/stores/current-user';
import { db } from '@/database';
import { createUser } from '@/database/models/user';

export const registerSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
});

export type RegisterForm = z.infer<typeof registerSchema>;

export const useRegisterForm = ({
    onScuccess,
    onFail,
}: {
    onScuccess: (user: User) => void;
    onFail: (error: Error) => void;
}) =>
    useForm<RegisterForm>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validators: {
            onChange: registerSchema,
        },
        onSubmit: async ({ value }) => {
            const store = getDefaultStore();

            const user = await db.users
                .where('email')
                .equals(value.email)
                .first();

            if (user) {
                onFail(new Error('User already exists'));
                return;
            }

            if (value.password !== value.confirmPassword) {
                onFail(new Error('Passwords do not match'));
                return;
            }

            const newUser = await createUser({
                username: value.username,
                email: value.email,
            });

            store.set(currentUserAtom, newUser);

            onScuccess(newUser);
        },
    });
