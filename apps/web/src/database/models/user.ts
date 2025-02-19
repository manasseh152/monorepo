import type { User, UserInsert } from '../schema';

import { UserId, generateUUID } from '@/database/utils';

export async function createUser(user: UserInsert): Promise<User> {
    const userId = UserId(generateUUID());
    const createdAt = Date.now();

    const newUser: User = {
        userId,
        ...user,
        createdAt,
        updatedAt: null,
        deletedAt: null,
    };

    return newUser;
}

export async function getUser(userId: UserId): Promise<User | undefined> {
    return undefined;
}

export async function getUsers(): Promise<User[]> {
    return [];
}

export async function updateUser(
    userId: UserId,
    user: Partial<UserInsert>,
): Promise<User> {
    const updatedAt = Date.now();

    const updatedUser: User = {
        userId,
        ...user,
        updatedAt,
    };

    return updatedUser;
}

export async function deleteUser(userId: UserId): Promise<void> {
    return;
}

export async function deleteAllUsers(): Promise<void> {
    return;
}
