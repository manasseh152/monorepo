import { useForm } from '@tanstack/react-form';
import { getDefaultStore } from 'jotai/vanilla';
import { z } from 'zod';

import { currentUserAtom } from '@/stores/current-user';

export const loginSchema = z.object({
    username: z.string().nonempty(),
});

export type LoginForm = z.infer<typeof loginSchema>;

export const useLoginForm = ({
    onScuccess,
    onFail,
}: {
    onScuccess: (user: string) => void;
    onFail: (error: Error) => void;
}) =>
    useForm<LoginForm>({
        defaultValues: {
            username: '',
        },
        validators: {
            onChange: loginSchema,
        },
        onSubmit: async ({ value: { username } }) => {
            try {
                const store = getDefaultStore();

                // TODO: Implement password checking

                store.set(currentUserAtom, username);

                onScuccess(username);
            } catch (error) {
                onFail(error as Error);
            }
        },
    });
