"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encryption_service_1 = require("./encryption.service");
describe('Encryption Service', () => {
    let encryptionService;
    beforeEach(() => {
        encryptionService = new encryption_service_1.EncryptionService();
    });
    it('Should create initialization vector', () => {
        const iv = encryptionService.createIv('test');
        expect(iv.byteLength).toBe(128 / 8);
    });
    it('Should generate RSA key pairs', async () => {
        const { privateKey, publicKey } = await encryptionService.generateRSAKeys();
        expect(typeof privateKey).toBe('string');
        expect(typeof publicKey).toBe('string');
    });
});
//# sourceMappingURL=encryption.service.spec.js.map