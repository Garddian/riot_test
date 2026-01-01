export interface CryptPort {
    encrypt(data: unknown): string;
    decrypt(token: string): any;
    sign(object: any): string;
    verify(token: string): boolean;
}
