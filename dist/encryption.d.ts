/// <reference types="node" />
export declare class Encryption {
    createIv(secret: string): Buffer;
    encryptAES(input: string, secret: string): string;
    decryptAES(input: string, secret: string): string;
    encryptRSA(input: string, publicKey: string): string;
    decryptRSA(input: string, privateKey: string, passphrase?: string): string;
    sha256(input: string): Buffer;
    generateRSAKeys(passphrase?: string): Promise<{
        privateKey: string;
        publicKey: string;
    }>;
}
