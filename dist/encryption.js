"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encryption = void 0;
const crypto = require("crypto");
class Encryption {
    createIv(secret) {
        const resizedIV = Buffer.allocUnsafe(16);
        crypto
            .createHash('sha256')
            .update(secret)
            .digest()
            .copy(resizedIV);
        return resizedIV;
    }
    encryptAES(input, secret) {
        const key = this.sha256(secret);
        const cipher = crypto.createCipheriv('aes256', key, this.createIv(secret));
        const encrypted = cipher.update(input, 'binary', 'base64') + cipher.final('base64');
        return encrypted;
    }
    decryptAES(input, secret) {
        const key = this.sha256(secret);
        const decipher = crypto.createDecipheriv('aes256', key, this.createIv(secret));
        const decrypted = decipher.update(input, 'base64', 'binary') + decipher.final('binary');
        return decrypted;
    }
    encryptRSA(input, publicKey) {
        const buffer = Buffer.from(input, 'utf8');
        const encrypted = crypto.publicEncrypt(publicKey, buffer);
        return encrypted.toString('base64');
    }
    decryptRSA(input, privateKey, passphrase) {
        const buffer = Buffer.from(input, 'base64');
        const decrypted = crypto.privateDecrypt({
            key: privateKey,
            passphrase
        }, buffer);
        return decrypted.toString('utf8');
    }
    sha256(input) {
        return crypto
            .createHash('sha256')
            .update(input)
            .digest();
    }
    async generateRSAKeys(passphrase = '') {
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
                    cipher: 'aes-256-cbc',
                    passphrase
                }
            }, (err, publicKey, privateKey) => {
                if (err)
                    return reject(err);
                resolve({ publicKey, privateKey });
            });
        });
    }
}
exports.Encryption = Encryption;
//# sourceMappingURL=encryption.js.map