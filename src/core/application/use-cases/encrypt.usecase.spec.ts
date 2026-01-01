import { EncryptUseCase } from './encrypt.usecase';
import { Base64Crypter } from '../../../adapters/crypter/base64.crypter';
import {SignUseCase} from "./sign.usecase";

describe('EncryptUseCase', () => {
    const crypter = new Base64Crypter();


    it('should encrypt each depth-1 property', () => {
        const uc = new EncryptUseCase(crypter);

        const input: JsonObject = {
            "name": "John Doe",
            "age": 30,
            "contact": {
                "email": "john@example.com",
                "phone": "123-456-7890"
            }
        };
        uc.execute(input).then((result) => {
            expect(result).toEqual({
                name: 'IkpvaG4gRG9lIg==',
                age: 'MzA=',
                contact: 'eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJwaG9uZSI6IjEyMy00NTYtNzg5MCJ9'
            });
        });

    });

    it('should encrypt each depth-1 property with deeply payload', () => {
        const uc = new EncryptUseCase(crypter);

        const input: JsonObject = {
            "user": {
                "contact": {
                    "name": {
                        "firstname": "Bob",
                        "lastname": "Hervé"
                    }
                }
            }
        };
        uc.execute(input).then((result) => {
            expect(result).toEqual({"user": "eyJjb250YWN0Ijp7Im5hbWUiOnsiZmlyc3RuYW1lIjoiQm9iIiwibGFzdG5hbWUiOiJIZXJ2w6kifX19"});
        });
    });

});
