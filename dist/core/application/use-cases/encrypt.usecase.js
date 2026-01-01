"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptUseCase = void 0;
const DomainError_1 = require("../../domain/DomainError");
class EncryptUseCase {
    constructor(crypt) {
        this.crypt = crypt;
    }
    async excute(data) {
        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            throw new DomainError_1.DomainError('INVALID_PAYLOAD', 'Data must be a object or array');
        }
        let data_encrypted = {};
        for (let key in data) {
            data_encrypted[key] = this.crypt.encrypt(data[key]);
        }
        console.log(data_encrypted);
        return data_encrypted;
    }
}
exports.EncryptUseCase = EncryptUseCase;
//# sourceMappingURL=encrypt.usecase.js.map