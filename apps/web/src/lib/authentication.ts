import type { User } from '@/database/schema';

import { getDefaultStore } from 'jotai/vanilla';

import { currentUserAtom } from '@/stores/current-user';

export function getCurrentUser(shouldThrow: true): User;
export function getCurrentUser(shouldThrow?: false): User | null;
export function getCurrentUser(shouldThrow: boolean | undefined): User | null {
    const store = getDefaultStore();

    const currentUser = store.get(currentUserAtom);

    if (shouldThrow && currentUser === null) {
        throw new Error('User is not authenticated');
    }

    return currentUser;
}

export function isAuthenticated() {
    const currentUser = getCurrentUser();

    console.log(currentUser);

    return currentUser !== null;
}

export function logout() {
    const store = getDefaultStore();

    store.set(currentUserAtom, null);
}

export function login(user: User) {
    const store = getDefaultStore();

    store.set(currentUserAtom, user);
}

export function useCurrentUser(shouldThrow: true): User;
export function useCurrentUser(shouldThrow?: false): User | null;
export function useCurrentUser(shouldThrow: boolean | undefined): User | null {
    const store = getDefaultStore();

    const currentUser = store.get(currentUserAtom);

    if (shouldThrow && currentUser === null) {
        throw new Error('User is not authenticated');
    }

    return currentUser;
}
