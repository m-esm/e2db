"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cipher = void 0;
const uuid = require("uuid");
const encryption_1 = require("./encryption");
const key_maker_1 = require("./key-maker");
class Cipher {
    static encryptModel(model, keys, opts) {
        const excludeFields = opts.exclude || ['_id'];
        const fields = opts.fields || Object.keys(model).filter(p => excludeFields.indexOf(p) === -1);
        const aesSecret = uuid.v4();
        fields.forEach(f => {
            model[f] = this.encryption.encryptAES(JSON.stringify(model[f]), aesSecret);
        });
        model._cipherKeys = keys.reduce((prev, current) => {
            prev[current._id.toHexString()] = this.encryption.encryptRSA(aesSecret, current.publicKey);
            return prev;
        }, {});
        model._cipherFields = fields;
        return model;
    }
    static decryptModel(model, key, cloudPassword, rsaPassphrase = '') {
        var _a;
        const privateKey = this.encryption.decryptAES(key.privateKey, cloudPassword);
        (_a = model._cipherFields) === null || _a === void 0 ? void 0 : _a.forEach(field => {
            const aesSecret = this.encryption.decryptRSA(model._cipherKeys[key._id.toHexString()], privateKey, rsaPassphrase);
            model[field] = JSON.parse(this.encryption.decryptAES(model[field], aesSecret));
        });
        delete model._cipherFields;
        delete model._cipherKeys;
        return model;
    }
}
exports.Cipher = Cipher;
Cipher.keyMaker = new key_maker_1.KeyMaker();
Cipher.encryption = new encryption_1.Encryption();
//# sourceMappingURL=cipher.js.map