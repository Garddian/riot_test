
export interface CryptPort {
    encrypt(data: unknown): string;
    decrypt(token: unknown): any;
    isEncoded(token: string): boolean;
    sign(object: unknown): string;
}