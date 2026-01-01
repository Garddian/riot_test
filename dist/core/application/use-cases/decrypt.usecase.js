"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecryptUseCase = void 0;
class DecryptUseCase {
    constructor(crypt) {
        this.crypt = crypt;
    }
    async excute(data) {
        let data_decrypted = {};
        for (let key in data) {
            data_decrypted[key] = this.crypt.decrypt(data[key]);
        }
        console.log(data_decrypted);
        return data_decrypted;
    }
}
exports.DecryptUseCase = DecryptUseCase;
//# sourceMappingURL=decrypt.usecase.js.map