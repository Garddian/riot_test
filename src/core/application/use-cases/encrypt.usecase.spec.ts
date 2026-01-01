import { EncryptUseCase } from './encrypt.usecase';
import { Base64Crypter } from '../../../adapters/crypter/base64.crypter';

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
        return uc.execute(input).then((result) => {
            return expect(result).toEqual({
                name: 'IkpvaG4gRG9lIg==',
                age: 'MzA=',
                contact: 'eyJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJwaG9uZSI6IjEyMy00NTYtNzg5MCJ9'
            });
        });



    });

});
