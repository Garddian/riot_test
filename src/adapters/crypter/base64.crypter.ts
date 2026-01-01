import {CryptPort} from "../../core/ports/crypt.port";
import { Injectable } from '@nestjs/common';

@Injectable()
export class Base64Crypter implements CryptPort {
    encrypt(data: unknown): string{
        const json = JSON.stringify(data);
        return Buffer.from(json, 'utf8').toString('base64');
    }
    decrypt(token: string):any {
        const decodedJson = Buffer.from(token, 'base64').toString('utf8');
        return JSON.parse(decodedJson);
    }
    sign(object: unknown): string{
        let json = '';
        if(this.isRecord(object))
        {
            json = JSON.stringify(this.canonicalize(object));
        } else {
            json = JSON.stringify(object);
        }
        return Buffer.from(json, 'utf8').toString('base64');;
    }
    verify(token: string): boolean{
        return true;
    }

    isEncoded(token: string): boolean {
        const base64Regex =
            /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

        return base64Regex.test(token);
    }

    canonicalize(obj: Record<string, unknown>){
        const sortedKeys = Object.keys(obj).sort();
        const sortedObj: Record<string, unknown> = {};

        for (const key of sortedKeys) {
            const value = obj[key];
            if(this.isRecord(value)){
                sortedObj[key] = this.canonicalize(value);
            } else {
                sortedObj[key] = obj[key];
            }
        }

        return sortedObj;
    }

    isRecord(value: unknown): value is Record<string, unknown> {
        return (
            typeof value === 'object' &&
            value !== null &&
            !Array.isArray(value)
        );
    }
}
