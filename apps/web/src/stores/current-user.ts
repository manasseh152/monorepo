import { atomWithStorage } from 'jotai/utils';

import type { User } from '@/database/schema';

export const currentUserAtom = atomWithStorage<User | null>(
    'currentUser',
    window.localStorage.getItem('currentUser')
        ? JSON.parse(window.localStorage.getItem('currentUser') as string)
        : null,
);
