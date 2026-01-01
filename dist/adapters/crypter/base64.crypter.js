"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64Crypter = void 0;
const common_1 = require("@nestjs/common");
let Base64Crypter = class Base64Crypter {
    encrypt(data) {
        const json = JSON.stringify(data);
        return Buffer.from(json, 'utf8').toString('base64');
        ;
    }
    decrypt(token) {
        const decodedJson = Buffer.from(token, 'base64').toString('utf8');
        return JSON.parse(decodedJson);
    }
    sign(object) {
        return 'bernard';
    }
    verify(token) {
        return true;
    }
};
exports.Base64Crypter = Base64Crypter;
exports.Base64Crypter = Base64Crypter = __decorate([
    (0, common_1.Injectable)()
], Base64Crypter);
//# sourceMappingURL=base64.crypter.js.map