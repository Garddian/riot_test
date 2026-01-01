import { SignUseCase } from './sign.usecase';
import { Base64Crypter } from '../../../adapters/crypter/base64.crypter';

describe('SignUseCase', () => {
    const crypter = new Base64Crypter();


    it('should sign all the payload', () => {
        const uc = new SignUseCase(crypter);

        const input: JsonObject = {
            "name": "John Doe",
            "age": 30,
            "contact": {
                "email": "john@example.com",
                "phone": "123-456-7890"
            }
        };
        return uc.execute(input).then((result) => {
            return expect(result).toEqual({"signature": "eyJhZ2UiOjMwLCJjb250YWN0Ijp7ImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInBob25lIjoiMTIzLTQ1Ni03ODkwIn0sIm5hbWUiOiJKb2huIERvZSJ9"});
        });

    });

     it('should sign all the payload same if order change', () => {
        const uc = new SignUseCase(crypter);

         const input: JsonObject = {
             "name": "John Doe",
             "age": 30,
             "contact": {
                 "email": "john@example.com",
                 "phone": "123-456-7890"
             }
         };
         const inputMissOrder: JsonObject = {
             "age": 30,
             "name": "John Doe",
             "contact": {
                 "phone": "123-456-7890",
                 "email": "john@example.com"
             }
         };


        return uc.execute(input).then((result) => {
            uc.execute(inputMissOrder).then((resultMissOrder) => {
                return expect(result).toEqual(resultMissOrder);
            });
        });

    });

});
