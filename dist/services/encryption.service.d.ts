/// <reference types="node" />
export declare class EncryptionService {
    createIv(secret: string): Buffer;
    encryptAES(input: string, secret: string): string;
    decryptAES(input: string, secret: string): string;
    generateRSAKeys(): Promise<{
        privateKey: string;
        publicKey: string;
    }>;
    encryptRSA(): void;
    decryptRSA(): void;
    sha256(input: any): Buffer;
}
