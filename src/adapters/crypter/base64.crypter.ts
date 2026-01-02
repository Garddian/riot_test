import {CryptPort} from "../../core/ports/crypt.port";
import { Injectable } from '@nestjs/common';

@Injectable()
export class Base64Crypter implements CryptPort {
    encrypt(data: unknown): StringEncoded{
        const json = JSON.stringify(data);
        return Buffer.from(json, 'utf8').toString('base64');
    }
    decrypt(token: string):any {
        const decodedJson = Buffer.from(token, 'base64').toString('utf8');
        return JSON.parse(decodedJson);
    }

    isEncoded(token: string): token is StringEncoded {

        const base64Regex =
            /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

        return base64Regex.test(token);
    }
}
