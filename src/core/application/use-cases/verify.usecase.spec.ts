import { VerifyUseCase } from './verify.usecase';
import { Base64Crypter } from '../../../adapters/crypter/base64.crypter';

describe('VerifyUseCase', () => {
    const crypter = new Base64Crypter();


    it('should verify all the payload', () => {
        const uc = new VerifyUseCase(crypter);

        const input: JsonObject = {
            "name": "John Doe",
            "age": 30,
            "contact": {
                "email": "john@example.com",
                "phone": "123-456-7890"
            },
            "signature": "eyJhZ2UiOjMwLCJjb250YWN0Ijp7ImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInBob25lIjoiMTIzLTQ1Ni03ODkwIn0sIm5hbWUiOiJKb2huIERvZSJ9"
        };
        return uc.execute(input).then((result) => {
            return expect(result).toEqual(true);
        });

    });

    it('should verify all the payload same if order change', () => {
        const uc = new VerifyUseCase(crypter);
        const input: JsonObject = {
           "age": 30,
            "name": "John Doe",
            "contact": {
                "phone": "123-456-7890",
                "email": "john@example.com",
            },
            "signature": "eyJhZ2UiOjMwLCJjb250YWN0Ijp7ImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInBob25lIjoiMTIzLTQ1Ni03ODkwIn0sIm5hbWUiOiJKb2huIERvZSJ9"
        };
        return uc.execute(input).then((result) => {
            return expect(result).toEqual(true);
        });

    });

    it('should verify all the payload same if order change', () => {
        const uc = new VerifyUseCase(crypter);

        const input: JsonObject = {
            "age": 31,
            "name": "John Doe",
            "contact": {
                "phone": "123-456-7890",
                "email": "john@example.com",
            },
            "signature": "eyJhZ2UiOjMwLCJjb250YWN0Ijp7ImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInBob25lIjoiMTIzLTQ1Ni03ODkwIn0sIm5hbWUiOiJKb2huIERvZSJ9"
        };
        return uc.execute(input).then((result) => {
            return expect(result).toEqual(false);
        });

    });

});
