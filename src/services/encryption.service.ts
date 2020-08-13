
import * as crypto from 'crypto';

export class EncryptionService {


  createIv(secret: string) {
    const resizedIV = Buffer.allocUnsafe(16);

    crypto
      .createHash("sha256")
      .update(secret)
      .digest()
      .copy(Buffer.allocUnsafe(16));

    return resizedIV;
  }

  encryptAES(input: string, secret: string) {

    const key = crypto
      .createHash("sha256")
      .update(secret)
      .digest();

    const cipher = crypto.createCipheriv("aes256", key, this.createIv(secret));

    const encrypted = cipher.update(input, "binary", "hex") + cipher.final("hex");

    return encrypted;
  }

  decryptAES(input: string, secret: string) {

    const key = this.sha256(secret);
    const decipher = crypto.createDecipheriv("aes256", key, this.createIv(secret));

    const encrypted = decipher.update(input, "hex", "binary") + decipher.final("binary");

    return encrypted;

  }

  async generateRSAKeys(): Promise<{ privateKey: string,
     publicKey: string }> {
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
          // cipher: 'aes-256-cbc',
          // passphrase: 'top secret'
        }
      }, (err, publicKey, privateKey) => {

        if (err) return reject(err);

        resolve({ publicKey, privateKey });

      });

    })
  }

  encryptRSA() {

  }

  decryptRSA() {

  }

  sha256(input): Buffer {
    return crypto
      .createHash("sha256")
      .update(input)
      .digest();
  }


}