import { DecryptUseCase } from './decrypt.usecase';
import { Base64Crypter } from '../../../adapters/crypter/base64.crypter';

describe('DecryptUseCase', () => {
    const crypter = new Base64Crypter();


    it('should decrypt each depth-1 property', () => {
        const uc = new DecryptUseCase(crypter);

        const input: JsonObject = {
            name: 'IkpvaG4gRG9lIg==',
            age: 'MzA=',
            contact: 'eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJwaG9uZSI6IjEyMy00NTYtNzg5MCJ9'
        };
        return uc.execute(input).then((result) => {
            return expect(result).toEqual({
                "name": "John Doe",
                "age": 30,
                "contact": {
                    "email": "john@example.com",
                    "phone": "123-456-7890"
                }
            });
        });
    });

    it('should decrypt each depth-1 property with no encoded params', () => {
        const uc = new DecryptUseCase(crypter);

        const input: JsonObject = {
            name: 'IkpvaG4gRG9lIg==',
            age: 'MzA=',
            contact: 'eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJwaG9uZSI6IjEyMy00NTYtNzg5MCJ9',
            firstname: 'bob'
        };
        return uc.execute(input).then((result) => {
            return expect(result).toEqual({
                "name": "John Doe",
                "age": 30,
                "contact": {
                    "email": "john@example.com",
                    "phone": "123-456-7890"
                },
                "firstname": 'bob'
            });
        });
    });

});
