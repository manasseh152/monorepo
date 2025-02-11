import type { User, UserInsert } from '../schema';

import { UserId, generateUUID } from '@/database/utils';
import { db } from '@/database';

export async function createUser(user: UserInsert): Promise<User> {
    const userId = UserId(generateUUID());
    const createdAt = new Date();

    const newUser: User = {
        userId,
        ...user,
        createdAt,
        createdBy: userId,
        updatedAt: null,
        updatedBy: null,
        deletedAt: null,
        deletedBy: null,
    };

    await db.users.add(newUser);

    return newUser;
}

export async function getUser(userId: UserId): Promise<User | undefined> {
    return db.users.get(userId);
}

export async function getUsers(): Promise<User[]> {
    return db.users.toArray();
}

export async function updateUser(
    userId: UserId,
    user: Partial<UserInsert>,
): Promise<User> {
    const updatedAt = new Date();

    await db.users.update(userId, {
        ...user,
        updatedAt,
    });

    return db.users.get(userId) as Promise<User>;
}

export async function deleteUser(userId: UserId): Promise<void> {
    await db.users.delete(userId);
}

export async function deleteAllUsers(): Promise<void> {
    await db.users.clear();
}
