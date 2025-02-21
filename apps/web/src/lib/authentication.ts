import { getDefaultStore } from 'jotai/vanilla';

import { currentUserAtom } from '@/stores/current-user';

export function getCurrentUser(shouldThrow: true): string;
export function getCurrentUser(shouldThrow?: false): string | null;
export function getCurrentUser(
    shouldThrow: boolean | undefined,
): string | null {
    const store = getDefaultStore();

    const currentUser = store.get(currentUserAtom);

    if (shouldThrow && currentUser === null) {
        throw new Error('User is not authenticated');
    }

    return currentUser;
}

/**
 * Check if the user is authenticated.
 *
 * @todo Implement the actual authentication logic.
 */
export function isAuthenticated() {
    const store = getDefaultStore();

    return store.get(currentUserAtom) !== null;
}

export function logout() {
    const store = getDefaultStore();

    store.set(currentUserAtom, null);
}

export function login(username: string) {
    const store = getDefaultStore();

    store.set(currentUserAtom, username);
}

export function useCurrentUser(shouldThrow: true): string;
export function useCurrentUser(shouldThrow?: false): string | null;
export function useCurrentUser(
    shouldThrow: boolean | undefined,
): string | null {
    const store = getDefaultStore();

    const currentUser = store.get(currentUserAtom);

    if (shouldThrow && currentUser === null) {
        throw new Error('User is not authenticated');
    }

    return currentUser;
}
