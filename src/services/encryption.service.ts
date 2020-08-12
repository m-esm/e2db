
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