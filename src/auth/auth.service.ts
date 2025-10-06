import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private users = [
        { email: 'user@example.com', passwordHash: bcrypt.hashSync('123456', 10) },
        { email: 'a@a.com', passwordHash: bcrypt.hashSync('123456', 10) },
    ];

    async validateUser(email: string, password: string): Promise<boolean> {
        const user = this.users.find((u) => u.email === email);
        if (!user) {
            console.debug('email not found');
            return false;
        };

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            console.debug('password does not match');
            return false;
        }
        console.debug('successful login');
        return isMatch;
    }

    async login(email: string, password: string): Promise<{ token: string } | null> {
        const isValid = await this.validateUser(email, password);
        if (!isValid) return null;

        return { token: 'fake-jwt-token-for-' + email };
    }
}
