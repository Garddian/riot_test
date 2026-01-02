import {IsObject, IsString} from "class-validator";
import { StringEncoded } from '../../../core/domain/TypeStringEncoded';
import { JsonObject } from '../../../core/domain/TypeJsonObject';
import {ApiProperty} from "@nestjs/swagger";

export class VerifyDto {
    @ApiProperty({ example: '5f1a600575756452e25da8b01ea63bab450ff2846dfbc3edc30fcc980ef416ec', description: 'HMAC signature' })
    @IsString()
    signature!: StringEncoded;

    @ApiProperty({ example: {
            name: 'John Doe',
            age: 30,
            active: true,
            contact: { email: 'john@doe.com' },
        } })
    @IsObject()
    data!: JsonObject;
}
