"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyMaker = void 0;
const encryption_1 = require("./encryption");
const bson_objectid_1 = require("bson-objectid");
class KeyMaker {
    constructor() {
        this.encryption = new encryption_1.Encryption();
    }
    async createKey(aesSecret, rsaPass = '') {
        const { privateKey, publicKey } = await this.encryption.generateRSAKeys(rsaPass);
        return {
            _id: new bson_objectid_1.default(),
            privateKey: this.encryption.encryptAES(privateKey, aesSecret),
            publicKey
        };
    }
    async changeKeySecret(key, oldSecret, newSecret) {
        const decryptedPrivateKey = this.encryption.decryptAES(key.privateKey, oldSecret);
        return Object.assign(Object.assign({}, key), { privateKey: this.encryption.encryptAES(decryptedPrivateKey, newSecret) });
    }
}
exports.KeyMaker = KeyMaker;
//# sourceMappingURL=key-maker.js.map