import {IsObject, IsString} from "class-validator";
import { StringEncoded } from '../../../core/domain/TypeStringEncoded';
import { JsonObject } from '../../../core/domain/TypeJsonObject';

export class VerifyDto {
    @IsString()
    signature!: StringEncoded;

    @IsObject()
    data!: JsonObject;
}
