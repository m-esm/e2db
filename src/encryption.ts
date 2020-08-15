
import * as crypto from 'crypto'
import { PassThrough } from 'stream'
import { Cipher } from './cipher'

export class Encryption {
  /**
   * Creates initialization vector for AES cipher
   * @param secret
   */
  createIv(secret: string) {
    const resizedIV = Buffer.allocUnsafe(16)

    crypto
      .createHash('sha256')
      .update(secret)
      .digest()
      .copy(resizedIV)

    return resizedIV
  }

  /**
   * Encrypted input using AES cipher by given secret
   * Initialization vector will be created using secret
   * @param input
   * @param secret
   */
  encryptAES(input: string, secret: string): string {
    const key = this.sha256(secret)

    const cipher = crypto.createCipheriv('aes256', key, this.createIv(secret))

    const encrypted = cipher.update(input, 'binary', 'base64') + cipher.final('base64')

    return encrypted
  }

  /**
   * Decrypt base64 encrypted input
   * @param input
   * @param secret
   */
  decryptAES(input: string, secret: string): string {
    const key = this.sha256(secret)
    const decipher = crypto.createDecipheriv('aes256', key, this.createIv(secret))

    const decrypted = decipher.update(input, 'base64', 'binary') + decipher.final('binary')

    return decrypted
  }

  /**
   * create AES encryption stream PassThrough
   * @param input
   * @param secret
   */
  createEncryptStreamAES(secret: string): PassThrough {
    const key = this.sha256(secret)

    const cipher = crypto.createCipheriv('aes256', key, this.createIv(secret))

    return cipher
  }

  /**
   * create AES decryption stream PassThrough
   * @param input
   * @param secret
   */
  createDecryptStreamAES(secret: string): PassThrough {
    const key = this.sha256(secret)
    const decipher = crypto.createDecipheriv('aes256', key, this.createIv(secret))

    return decipher
  }

  /**
   * encrypts input using RSA and given public key
   * @param input
   * @param publicKey
   */
  encryptRSA(input: string, publicKey: string) {
    const buffer = Buffer.from(input, 'utf8')
    const encrypted = crypto.publicEncrypt(publicKey, buffer)

    return encrypted.toString('base64')
  }

  /**
   * decrypts encrypted base64 input using RSA and given public key
   * @param input base64 input encrypted with RSA
   * @param publicKey
   */
  decryptRSA(input: string, privateKey: string, passphrase: string) {
    const buffer = Buffer.from(input, 'base64')

    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        passphrase,
        padding: 0
      },
      buffer
    )

    return decrypted.toString('utf8')
  }

  /**
   * Creates sha256 hash from input string
   * @param input
   */
  sha256(input: string): Buffer {
    return crypto
      .createHash('sha256')
      .update(input)
      .digest()
  }

  /**
   * Generates RSA key pairs
   * @param passphrase
   */
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
