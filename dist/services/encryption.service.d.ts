/// <reference types="node" />
export declare class EncryptionService {
    createIv(secret: string): Buffer;
    encryptAES(input: string, secret: string): string;
    decryptAES(input: string, secret: string): string;
    generateRSAKeys(passphrase?: string): Promise<{
        privateKey: string;
        publicKey: string;
    }>;
    encryptRSA(input: string, publicKey: string): string;
    decryptRSA(input: string, privateKey: string, passphrase?: string): string;
    sha256(input: string): Buffer;
}
