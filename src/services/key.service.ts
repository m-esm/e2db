import { EncryptionService } from './encryption.service'
import { Key } from '../interfaces/key.interface'
import ObjectID from 'bson-objectid'

export class KeyService {
    private readonly encryptionService = new EncryptionService();

    async createKey(aesSecret: string, rsaPass: string = ''): Promise<Key> {
        const { privateKey, publicKey } = await this.encryptionService.generateRSAKeys(rsaPass)

        return {
            _id: new ObjectID(),
            privateKey: this.encryptionService.encryptAES(privateKey, aesSecret),
            publicKey
        }
    }
}
