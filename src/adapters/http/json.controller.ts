import {BadRequestException, Body, Controller, Get, HttpCode, Post} from '@nestjs/common';
import {EncryptUseCase} from '../../core/application/use-cases/encrypt.usecase';
import {DecryptUseCase} from "../../core/application/use-cases/decrypt.usecase";
import {SignUseCase} from "../../core/application/use-cases/sign.usecase";

@Controller('json')
export class JsonController {
    constructor(
        private readonly encrypt: EncryptUseCase,
        private readonly decrypt: DecryptUseCase,
        private readonly sign: SignUseCase,
        private readonly verify: VerifyUseCase
    ) {}

    @Post('encrypt')
    async encryptAction(@Body() body: JsonObject) {
        return this.encrypt.execute(body);
    }

    @Post('decrypt')
    async decryptAction(@Body() body: JsonObject) {
        return this.decrypt.execute(body);
    }

    @Post('sign')
    async signAction(@Body() body: JsonObject) {
        return this.sign.execute(body);
    }

    @Post('verify')
    @HttpCode(204)
    async verifyAction(@Body() body: JsonObject) {
        if(!this.verify.execute(body)){
            throw new BadRequestException({
                code: 'INVALID_SIGNATURE',
                message: 'Signature is invalid',
            });
        }
        return this.sign.execute(body);
    }
}
