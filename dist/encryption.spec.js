"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encryption_1 = require("./encryption");
const fs = require("fs");
describe('Encryption', () => {
    let encryption;
    beforeEach(() => {
        encryption = new encryption_1.Encryption();
    });
    it('Should encrypt with AES', () => {
        const encrypted = encryption.encryptAES('12356', 'test');
        expect(typeof encrypted).toBe('string');
    });
    it('Should encrypt and decrypt with AES stream', async () => {
        const encryptPassTrough = encryption.createEncryptStreamAES('12356');
        const decryptPassTrough = encryption.createDecryptStreamAES('12356');
        const fileData = fs.readFileSync(__filename).toString();
        const pipedData = await new Promise((resolve, reject) => {
            let temp = '';
            fs.createReadStream(__filename).pipe(encryptPassTrough).pipe(decryptPassTrough).on('data', (chunk) => {
                temp += chunk;
            }).on('end', () => {
                resolve(temp);
            }).on('error', (e) => {
                reject(e);
            });
        });
        expect(pipedData).toBe(fileData);
    });
    it('Should decrypt with AES', () => {
        const input = '123456';
        const encrypted = encryption.encryptAES(input, 'test');
        const decrypted = encryption.decryptAES(encrypted, 'test');
        expect(input).toEqual(decrypted);
    });
    it('Should encrypt with RSA', async () => {
        const { publicKey } = await encryption.generateRSAKeys('rsa-pass');
        const encrypted = encryption.encryptRSA('12356', publicKey);
        expect(typeof encrypted).toBe('string');
    });
    it('Should decrypt with RSA', async () => {
        const input = '123456';
        const { publicKey, privateKey } = await encryption.generateRSAKeys('rsa-pass');
        const encrypted = encryption.encryptRSA(input, publicKey);
        const decrypted = encryption.decryptRSA(encrypted, privateKey, 'rsa-pass');
        expect(input).toEqual(decrypted);
    });
    it('Should create initialization vector', () => {
        const iv = encryption.createIv('test');
        expect(iv.byteLength).toBe(128 / 8);
    });
    it('Should generate RSA key pairs', async () => {
        const { privateKey, publicKey } = await encryption.generateRSAKeys();
        expect(typeof privateKey).toBe('string');
        expect(typeof publicKey).toBe('string');
    });
});
//# sourceMappingURL=encryption.spec.js.map