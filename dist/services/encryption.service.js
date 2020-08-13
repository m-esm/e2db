"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionService = void 0;
const crypto = require("crypto");
class EncryptionService {
    createIv(secret) {
        const resizedIV = Buffer.allocUnsafe(16);
        crypto
            .createHash("sha256")
            .update(secret)
            .digest()
            .copy(Buffer.allocUnsafe(16));
        return resizedIV;
    }
    encryptAES(input, secret) {
        const key = crypto
            .createHash("sha256")
            .update(secret)
            .digest();
        const cipher = crypto.createCipheriv("aes256", key, this.createIv(secret));
        const encrypted = cipher.update(input, "binary", "hex") + cipher.final("hex");
        return encrypted;
    }
    decryptAES(input, secret) {
        const key = this.sha256(secret);
        const decipher = crypto.createDecipheriv("aes256", key, this.createIv(secret));
        const encrypted = decipher.update(input, "hex", "binary") + decipher.final("binary");
        return encrypted;
    }
    async generateRSAKeys() {
        return new Promise((resolve, reject) => {
            crypto.generateKeyPair('rsa', {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem',
                }
            }, (err, publicKey, privateKey) => {
                if (err)
                    return reject(err);
                resolve({ publicKey, privateKey });
            });
        });
    }
    encryptRSA() {
    }
    decryptRSA() {
    }
    sha256(input) {
        return crypto
            .createHash("sha256")
            .update(input)
            .digest();
    }
}
exports.EncryptionService = EncryptionService;
//# sourceMappingURL=encryption.service.js.map