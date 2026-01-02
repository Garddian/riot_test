import {BadRequestException, Body, Controller, Get, HttpCode, Post, UseGuards} from '@nestjs/common';
import {EncryptUseCase} from '../../core/application/use-cases/encrypt.usecase';
import {DecryptUseCase} from "../../core/application/use-cases/decrypt.usecase";
import {SignUseCase} from "../../core/application/use-cases/sign.usecase";
import {VerifyUseCase} from "../../core/application/use-cases/verify.usecase";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {VerifyDto} from "./dto/verify.dto";
import { JsonObject } from '../../core/domain/TypeJsonObject';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiProperty, ApiResponse} from "@nestjs/swagger";

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('json')
export class JsonController {
    constructor(
        private readonly encrypt: EncryptUseCase,
        private readonly decrypt: DecryptUseCase,
        private readonly sign: SignUseCase,
        private readonly verify: VerifyUseCase
    ) {}

    @Post('encrypt')
    @ApiOperation({ summary: 'Decrypt what encrypt endpoint make' })
    @ApiResponse({ status: 201, description: 'Encrypt first depth' })
    @ApiResponse({ status: 400, description: 'Invalid payload' })
    @ApiBody({
        description: 'Arbitrary JSON object. Depth-1 values will be encrypted.',
        schema: {
            type: 'object',
            additionalProperties: true,
            example: {
                name: 'John Doe',
                age: 30,
                active: true,
                contact: { email: 'john@doe.com' },
            },
        },
    })
    async encryptAction(@Body() body: JsonObject) {
        return this.encrypt.execute(body);
    }

    @Post('decrypt')
    @ApiOperation({ summary: 'Decrypt what encrypt endpoint make' })
    @ApiResponse({ status: 201, description: 'Valid decrypt' })
    @ApiResponse({ status: 400, description: 'Invalid payload' })
    @ApiBody({
        description: 'Arbitrary JSON object. all encrypted values will be decrypt.',
        schema: {
            type: 'object',
            additionalProperties: true,
            example: {
                "name": "IkpvaG4gRG9lIg==",
                "age": "MzA=",
                "active": "dHJ1ZQ==",
                "contact": "eyJlbWFpbCI6ImpvaG5AZG9lLmNvbSJ9"
            },
        },
    })
    async decryptAction(@Body() body: JsonObject) {
        return this.decrypt.execute(body);
    }

    @Post('sign')
    @ApiOperation({ summary: 'Sign with HMAC' })
    @ApiResponse({ status: 201, description: 'sign the object' })
    @ApiResponse({ status: 400, description: 'Invalid payload' })
    @ApiBody({
        description: 'Example JSON object',
        schema: {
            type: 'object',
            additionalProperties: true,
            example: {
                name: 'John Doe',
                age: 30,
                active: true,
                contact: { email: 'john@doe.com' },
            },
        },
    })    async signAction(@Body() body: JsonObject) {
        return this.sign.execute(body);
    }

    @Post('verify')
    @HttpCode(204)
    @ApiOperation({ summary: 'Verify signature (HMAC)' })
    @ApiResponse({ status: 204, description: 'Valid signature' })
    @ApiResponse({ status: 400, description: 'Invalid signature or payload' })
    @ApiBody({ type: VerifyDto })
    async verifyAction(@Body() body: VerifyDto) {
        if(!await this.verify.execute(body)){
            throw new BadRequestException({
                code: 'INVALID_SIGNATURE',
                message: 'Signature is invalid',
            });
        }
    }
}
