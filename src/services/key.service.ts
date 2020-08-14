import { EncryptionService } from './encryption.service'
import { Key } from '../interfaces/key.interface'
import ObjectID from 'bson-objectid'

export class KeyService {
    private readonly encryptionService = new EncryptionService();

    /**
     * creates a RSA key pair and encrypts the private part with AES cipher
     * @param aesSecret {string}
     * @param rsaPass {string}
     */
    async createKey(aesSecret: string, rsaPass: string = ''): Promise<Key> {
        const { privateKey, publicKey } = await this.encryptionService.generateRSAKeys(rsaPass)

        return {
            _id: new ObjectID(),
            privateKey: this.encryptionService.encryptAES(privateKey, aesSecret),
            publicKey
        }
    }

    /**
     * changes secret of RSA private key ( cloud password )
     * @param key {Key} input key to change secret
     * @param oldSecret {string}
     * @param newSecret {string}
     * @returns Key with changed secret {Key}
     */
    async changeKeySecret(key: Key, oldSecret: string, newSecret: string): Promise<Key> {
        const decryptedPrivateKey = this.encryptionService.decryptAES(key.privateKey, oldSecret)

        return {
            ...key,
            privateKey: this.encryptionService.encryptAES(decryptedPrivateKey, newSecret)
        }
    }
}
