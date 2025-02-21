import { randomUUID, type UUID } from 'crypto';

export function generateUUID(): UUID {
    return randomUUID();
}
