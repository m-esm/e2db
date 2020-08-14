import { Encryption } from './encryption'
import { Key } from './key'
import ObjectID from 'bson-objectid'

export class KeyMaker {
    private readonly encryption = new Encryption();

    /**
     * creates a RSA key pair and encrypts the private part with AES cipher
     * @param aesSecret {string}
     * @param rsaPass {string}
     */
    async createKey(aesSecret: string, rsaPass: string = ''): Promise<Key> {
        const { privateKey, publicKey } = await this.encryption.generateRSAKeys(rsaPass)

        return {
            _id: new ObjectID(),
            privateKey: this.encryption.encryptAES(privateKey, aesSecret),
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
        const decryptedPrivateKey = this.encryption.decryptAES(key.privateKey, oldSecret)

        return {
            ...key,
            privateKey: this.encryption.encryptAES(decryptedPrivateKey, newSecret)
        }
    }
}
