import { SignUseCase } from './sign.usecase';
import { Base64Crypter } from '../../../adapters/crypter/base64.crypter';
import {HmacCrypter} from "../../../adapters/crypter/hmac.crypter";

describe('SignUseCase', () => {
    const crypter = new HmacCrypter();

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
        uc.execute(input).then((result) => {
            expect(result).toEqual({"signature": "ce921797127c3fbbc4725a297397b4c7e4268fcdd5cb1b85fa37d5b80306c896"});
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

        uc.execute(input).then((result) => {
            uc.execute(inputMissOrder).then((resultMissOrder) => {
                expect(result).toEqual(resultMissOrder);
            });
        });
    });

    it('should sign all the payload deeply', () => {
        const uc = new SignUseCase(crypter);

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
            expect(result).toEqual({"signature": "81136eebfd28f41a943ab03e9fc91d4c03d794b7a281090613ab84fb71be72b3"});
        });

    });

    it('should sign all the payload same if order change', () => {
        const uc = new SignUseCase(crypter);
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
        const inputMissOrder: JsonObject = {
            "user": {
                "contact": {
                    "name": {
                        "lastname": "Hervé",
                        "firstname": "Bob"
                    }
                }
            }
        };

        uc.execute(input).then((result) => {
            uc.execute(inputMissOrder).then((resultMissOrder) => {
                expect(result).toEqual(resultMissOrder);
            });
        });
    });
});
