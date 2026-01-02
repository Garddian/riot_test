import {IsObject, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty({default: 'riot', description: 'auth user name' })
    @IsString()
    username!: string;

    @ApiProperty({default: 'test', description: 'auth pwd user' })
    @IsString()
    password!: string;
}
