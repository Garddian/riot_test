// src/infrastructure/http/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwt: JwtService) {}

    login(username: string, password: string) {
        if (username !== 'riot' || password !== 'test') {
            throw new UnauthorizedException('Invalid credentials');
        }

        return {
            access_token: this.jwt.sign({ sub: username }),
        };
    }
}
