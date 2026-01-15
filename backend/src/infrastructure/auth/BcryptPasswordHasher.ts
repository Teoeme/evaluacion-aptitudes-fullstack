import { IPasswordHasher } from "../../domain/services/IPasswordHasher";
import bcrypt from 'bcryptjs';

export class BcryptPasswordHasher implements IPasswordHasher {
    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async comparar(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}