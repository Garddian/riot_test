import {CryptPort} from "../../core/ports/crypt.port";
import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import {DomainError} from "../../core/domain/DomainError";
import {isJsonObject} from "../../core/domain/IsJsonObject.guard";
import {StringEncoded} from "../../core/domain/TypeStringEncoded";
import {JsonObject} from "../../core/domain/TypeJsonObject";

@Injectable()
export class HmacCrypter implements CryptPort {
    private readonly secret: string;

    constructor() {
        this.secret = String(process.env.HMAC_SECRET);
    }
    encrypt(data: unknown): StringEncoded{
        if(!isJsonObject(data)){
            throw new DomainError("INVALID_PAYLOAD","data not record")
        }
        const canonicalData = this.canonicalize(data);
        return crypto.createHmac('sha256', this.secret).update(JSON.stringify(canonicalData), 'utf8').digest('hex');
    }
    decrypt(token: string):any {
        return false;
    }

    isEncoded(token: string): token is StringEncoded {
        const regex =
            /^[a-fA-F0-9]{64}$/;

        return regex.test(token);
    }

    private canonicalize(obj: JsonObject){
        const sortedKeys = Object.keys(obj).sort();
        const sortedObj: JsonObject = {};

        for (const key of sortedKeys) {
            const value = obj[key];
            if(isJsonObject(value)){
                sortedObj[key] = this.canonicalize(value);
            } else {
                sortedObj[key] = obj[key];
            }
        }
        return sortedObj;
    }

}
