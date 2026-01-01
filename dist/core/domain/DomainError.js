"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = void 0;
class DomainError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.DomainError = DomainError;
//# sourceMappingURL=DomainError.js.map