
import * as crypto from 'crypto'

export class EncryptionService {
  createIv(secret: string) {
    const resizedIV = Buffer.allocUnsafe(16)

    crypto
      .createHash('sha256')
      .update(secret)
      .digest()
      .copy(resizedIV)

    return resizedIV
  }

  encryptAES(input: string, secret: string) {
    const key = this.sha256(secret)

    const cipher = crypto.createCipheriv('aes256', key, this.createIv(secret))

    const encrypted = cipher.update(input, 'binary', 'hex') + cipher.final('hex')

    return encrypted
  }

  decryptAES(input: string, secret: string) {
    const key = this.sha256(secret)
    const decipher = crypto.createDecipheriv('aes256', key, this.createIv(secret))

    const decrypted = decipher.update(input, 'hex', 'binary') + decipher.final('binary')

    return decrypted
  }

  encryptRSA(input: string, publicKey: string) {
    const buffer = Buffer.from(input, 'utf8')
    const encrypted = crypto.publicEncrypt(publicKey, buffer)

    return encrypted.toString('base64')
  }

  decryptRSA(input: string, privateKey: string, passphrase?: string) {
    const buffer = Buffer.from(input, 'base64')
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        passphrase
      },
      buffer
    )

    return decrypted.toString('utf8')
  }

  sha256(input: string): Buffer {
    return crypto
      .createHash('sha256')
      .update(input)
      .digest()
  }

  async generateRSAKeys(passphrase: string = ''): Promise<{
    privateKey: string,
    publicKey: string
  }> {
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
        if (err) return reject(err)

        resolve({ publicKey, privateKey })
      })
    })
  }
}
