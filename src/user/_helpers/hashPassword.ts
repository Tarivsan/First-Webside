import { hashSync, genSaltSync } from 'bcryptjs'

export function hashPassword(password: string): string {
    return hashSync(password, genSaltSync(10));
}