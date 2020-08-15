"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const key_maker_1 = require("./key-maker");
const encryption_1 = require("./encryption");
describe('Key Maker ', () => {
    let keyMaker;
    let encryption;
    beforeEach(() => {
        keyMaker = new key_maker_1.KeyMaker();
        encryption = new encryption_1.Encryption();
    });
    it('should create a key', async () => {
        const aesSecret = '123456';
        const toEncrypt = 'test';
        const { privateKey, publicKey } = await keyMaker.createKey(aesSecret, 'rsa-pass');
        const encrypted = encryption.encryptRSA(toEncrypt, publicKey);
        const decrypted = encryption.decryptRSA(encrypted, encryption.decryptAES(privateKey, aesSecret), 'rsa-pass');
        expect(decrypted).toBe(toEncrypt);
    });
    it('should change a key secret', async () => {
        const aesSecret = '111';
        const aesSecretUpdate = '222';
        const key = await keyMaker.createKey(aesSecret, 'rsa-pass');
        const keyWithPasswordChanged = await keyMaker.changeKeySecret(key, aesSecret, aesSecretUpdate);
        expect(key.publicKey).toBe(keyWithPasswordChanged.publicKey);
        expect(key._id).toBe(keyWithPasswordChanged._id);
        expect(encryption.decryptAES(key.privateKey, aesSecret))
            .toBe(encryption.decryptAES(keyWithPasswordChanged.privateKey, aesSecretUpdate));
    });
});
//# sourceMappingURL=key-maker.spec.js.map