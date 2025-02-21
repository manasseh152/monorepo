import { atomWithStorage } from 'jotai/utils';

export const currentUserAtom = atomWithStorage<string | null>(
    'currentUser',
    null,
);
