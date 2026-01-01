import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';


import { JsonController } from './adapters/http/json.controller';

import { EncryptUseCase } from './core/application/use-cases/encrypt.usecase';
import { DecryptUseCase } from "./core/application/use-cases/decrypt.usecase";
import { SignUseCase } from "./core/application/use-cases/sign.usecase";
import { Base64Crypter } from "./adapters/crypter/base64.crypter";
import { CryptPort } from "./core/ports/crypt.port";


@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),

    ],
    controllers: [JsonController],
    providers: [
        Base64Crypter,
        {
            provide: EncryptUseCase,
            useFactory: (crypt: CryptPort) => new EncryptUseCase(crypt),
            inject: [Base64Crypter],
        },
        {
            provide: DecryptUseCase,
            useFactory: (crypt: CryptPort) => new DecryptUseCase(crypt),
            inject: [Base64Crypter],
        },
        {
            provide: SignUseCase,
            useFactory: (crypt: CryptPort) => new SignUseCase(crypt),
            inject: [Base64Crypter],
        },
    ],

})
export class AppModule {}
