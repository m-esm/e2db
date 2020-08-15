"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const cipher_1 = require("./cipher");
const encryption_1 = require("./encryption");
const key_maker_1 = require("./key-maker");
describe('Cipher', () => {
    let keyMaker;
    let encryption;
    beforeEach(() => {
        keyMaker = new key_maker_1.KeyMaker();
        encryption = new encryption_1.Encryption();
    });
    it('should encrypt a model', async () => {
        const keys = await Promise.all(['1', '2'].map(p => keyMaker.createKey(p)));
        const model = { message: 'hello world', secretMessage: 'privacy matters' };
        const encryptedModel = cipher_1.Cipher.encryptModel(model, keys, { fields: ['secretMessage'] });
        expect(encryptedModel._cipherFields[0]).toBe('secretMessage');
        expect(Object.keys(encryptedModel._cipherKeys)).toHaveLength(2);
    });
    it('should decrypt a model', async () => {
        const cloudPasswords = [uuid.v4(), uuid.v4()];
        const keys = await Promise.all(cloudPasswords.map(p => keyMaker.createKey(p)));
        const model = { message: 'hello world', secretMessage: 'privacy matters' };
        const encryptedModel = cipher_1.Cipher.encryptModel(model, keys, { fields: ['secretMessage'] });
        for (let i = 0; i < 2; i++) {
            const decryptedModel = cipher_1.Cipher.decryptModel(encryptedModel, keys[0], cloudPasswords[0]);
            expect(decryptedModel.secretMessage).toBe(model.secretMessage);
            expect(decryptedModel._cipherKeys).toBeUndefined();
            expect(decryptedModel._cipherKeys).toBeUndefined();
        }
    });
});
//# sourceMappingURL=cipher.spec.js.map