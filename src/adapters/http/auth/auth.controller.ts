import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiBody, ApiOperation, ApiResponse} from "@nestjs/swagger";
import {AuthDto} from "./auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post('login')
    @ApiOperation({ summary: 'auth' })
    @ApiResponse({ status: 201, description: 'bearer token' })
    @ApiResponse({ status: 400, description: 'Invalid auth' })
    @ApiBody({ type: AuthDto })
    login(@Body() body: AuthDto) {
        return this.auth.login(body.username, body.password);
    }
}
