import { VerifyUseCase } from './verify.usecase';
import { Base64Crypter } from '../../../adapters/crypter/base64.crypter';
import {DomainError} from "../../domain/DomainError";

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
        uc.execute(input).then((result) => {
            expect(result).toEqual(true);
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
        uc.execute(input).then((result) => {
            expect(result).toEqual(true);
        });

    });

    it('should verify the payload same if it\'s change', () => {
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
        uc.execute(input).then((result) => {
            expect(result).toEqual(false);
        });

    });

    it('should verify all the deeply payload', () => {
        const uc = new VerifyUseCase(crypter);

        const input: JsonObject = {
            "user": {
                "contact": {
                    "name": {
                        "firstname": "Bob",
                        "lastname": "Hervé"
                    }
                }
            },
            "signature": "eyJ1c2VyIjp7ImNvbnRhY3QiOnsibmFtZSI6eyJmaXJzdG5hbWUiOiJCb2IiLCJsYXN0bmFtZSI6IkhlcnbDqSJ9fX19"
        };
        uc.execute(input).then((result) => {
            expect(result).toEqual(true);
        });

    });

    it('should verify all the deeply payload same if order change', () => {
        const uc = new VerifyUseCase(crypter);
        const input: JsonObject = {
            "user": {
                "contact": {
                    "name": {
                        "firstname": "Bob",
                        "lastname": "Hervé"
                    }
                }
            },
            "signature": "eyJ1c2VyIjp7ImNvbnRhY3QiOnsibmFtZSI6eyJmaXJzdG5hbWUiOiJCb2IiLCJsYXN0bmFtZSI6IkhlcnbDqSJ9fX19"
        };
        uc.execute(input).then((result) => {
            expect(result).toEqual(true);
        });

    });

    it('should verify the deeply payload same if it\'s change', () => {
        const uc = new VerifyUseCase(crypter);

        const input: JsonObject = {
            "user": {
                "contact": {
                    "name": {
                        "firstname": "Bernard",
                        "lastname": "Hervé"
                    }
                }
            },
            "signature": "eyJ1c2VyIjp7ImNvbnRhY3QiOnsibmFtZSI6eyJmaXJzdG5hbWUiOiJCb2IiLCJsYXN0bmFtZSI6IkhlcnbDqSJ9fX19"
        };
        uc.execute(input).then((result) => {
            expect(result).toEqual(false);
        });

    });

    it('should throw error when signature is missing', () => {
        const uc = new VerifyUseCase(crypter);

        const input: JsonObject = {
            "user": {
                "contact": {
                    "name": {
                        "firstname": "Bernard",
                        "lastname": "Hervé"
                    }
                }
            },
        };

        expect(uc.execute(input)).rejects.toEqual(new DomainError('INVALID_PAYLOAD','Signature is required and must be a string'));
    });

    it('should throw error when signature is not a string', () => {
        const uc = new VerifyUseCase(crypter);

        const input: JsonObject = {
            "user": {
                "contact": {
                    "name": {
                        "firstname": "Bernard",
                        "lastname": "Hervé"
                    }
                }
            },
            "signature": true
        };

        expect(uc.execute(input)).rejects.toEqual(new DomainError('INVALID_PAYLOAD','Signature is required and must be a string'));
    });

    it('should throw error when signature is not encoded', () => {
        const uc = new VerifyUseCase(crypter);

        const input: JsonObject = {
            "user": {
                "contact": {
                    "name": {
                        "firstname": "Bernard",
                        "lastname": "Hervé"
                    }
                }
            },
            "signature": 'signature'
        };

        expect(uc.execute(input)).rejects.toEqual(new DomainError('INVALID_PAYLOAD','Signature is required and must be a string'));
    });

    it('should throw error when signature wrong place', () => {
        const uc = new VerifyUseCase(crypter);

        const input: JsonObject = {
            "user": {
                "contact": {
                    "name": {
                        "firstname": "Bernard",
                        "lastname": "Hervé"
                    }
                },
                "signature": 'signature'
            },

        };

        expect(uc.execute(input)).rejects.toEqual(new DomainError('INVALID_PAYLOAD','Signature is required and must be a string'));
    });

});
