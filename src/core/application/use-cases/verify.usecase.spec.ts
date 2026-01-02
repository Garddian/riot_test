import { VerifyUseCase } from './verify.usecase';
import { DomainError } from "../../domain/DomainError";
import { HmacCrypter } from "../../../adapters/crypter/hmac.crypter";
import { VerifyPayload } from "../../domain/TypeVerifyPayload";

describe('VerifyUseCase', () => {
    const crypter = new HmacCrypter();

    it('should verify all the payload', () => {
        const uc = new VerifyUseCase(crypter);

        const input: VerifyPayload = {
            "data": {
                "name": "John Doe",
                "age": 30,
                "contact": {
                    "email": "john@example.com",
                    "phone": "123-456-7890"
                },
            },
            "signature": "ce921797127c3fbbc4725a297397b4c7e4268fcdd5cb1b85fa37d5b80306c896"
        };
        uc.execute(input).then((result) => {
            expect(result).toEqual(true);
        });

    });

    it('should verify all the payload same if order change', () => {
        const uc = new VerifyUseCase(crypter);
        const input: VerifyPayload = {
            "data": {
                "age": 30,
                "name": "John Doe",
                "contact": {
                    "phone": "123-456-7890",
                    "email": "john@example.com",
                },
            },
            "signature": "ce921797127c3fbbc4725a297397b4c7e4268fcdd5cb1b85fa37d5b80306c896"
        };
        uc.execute(input).then((result) => {
            expect(result).toEqual(true);
        });

    });

    it('should verify the payload same if it\'s change', () => {
        const uc = new VerifyUseCase(crypter);

        const input: VerifyPayload = {
            "data": {
                "age": 31,
                "name": "John Doe",
                "contact": {
                    "phone": "123-456-7890",
                    "email": "john@example.com",
                },
            },
            "signature": "ce921797127c3fbbc4725a297397b4c7e4268fcdd5cb1b85fa37d5b80306c896"
        };
        uc.execute(input).then((result) => {
            expect(result).toEqual(false);
        });

    });

    it('should verify all the deeply payload', () => {
        const uc = new VerifyUseCase(crypter);

        const input: VerifyPayload = {
            "data":{
                "user": {
                    "contact": {
                        "name": {
                            "firstname": "Bob",
                            "lastname": "Hervé"
                        }
                    }
                }
            },
            "signature": "81136eebfd28f41a943ab03e9fc91d4c03d794b7a281090613ab84fb71be72b3"
        };
        uc.execute(input).then((result) => {
            expect(result).toEqual(true);
        });

    });

    it('should verify all the deeply payload same if order change', () => {
        const uc = new VerifyUseCase(crypter);
        const input: VerifyPayload = {
            "data":{
                "user": {
                    "contact": {
                        "name": {
                            "firstname": "Bob",
                            "lastname": "Hervé"
                        }
                    }
                }
            },
            "signature": "81136eebfd28f41a943ab03e9fc91d4c03d794b7a281090613ab84fb71be72b3"
        };
        uc.execute(input).then((result) => {
            expect(result).toEqual(true);
        });

    });

    it('should verify the deeply payload same if it\'s change', () => {
        const uc = new VerifyUseCase(crypter);

        const input: VerifyPayload = {
            "data":{

                "user": {
                    "contact": {
                        "name": {
                            "firstname": "Bernard",
                            "lastname": "Hervé"
                        }
                    }
                }
            },
            "signature": "81136eebfd28f41a943ab03e9fc91d4c03d794b7a281090613ab84fb71be72b3"
        };
        uc.execute(input).then((result) => {
            expect(result).toEqual(false);
        });

    });

    it('should throw error when signature is not encoded', () => {
        const uc = new VerifyUseCase(crypter);

        const input: VerifyPayload = {
            "data":{
                "user": {
                    "contact": {
                        "name": {
                            "firstname": "Bernard",
                            "lastname": "Hervé"
                        }
                    }
                },
            },
            "signature": 'signature'
        };

        expect(uc.execute(input)).rejects.toEqual(new DomainError('INVALID_PAYLOAD','Signature is required and must be a string'));
    });

});
