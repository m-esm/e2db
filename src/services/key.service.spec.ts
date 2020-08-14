/* eslint-disable no-undef */
import { KeyService } from './key.service'
import { EncryptionService } from './encryption.service'

describe('Encryption Service', () => {
    let keyService: KeyService
    let encryptionService: EncryptionService

    beforeEach(() => {
        keyService = new KeyService()
        encryptionService = new EncryptionService()
    })

    it('should create a key', async () => {
        const aesSecret = '123456'
        const toEncrypt = 'test'

        const { privateKey, publicKey } = await keyService.createKey(aesSecret)

        const encrypted = encryptionService.encryptRSA(toEncrypt, publicKey)

        const decrypted = encryptionService.decryptRSA(encrypted, encryptionService.decryptAES(privateKey, aesSecret))

        expect(decrypted).toBe(toEncrypt)
    })

    it('should change a key secret', async () => {
        const aesSecret = '111'
        const aesSecretUpdate = '222'

        const key = await keyService.createKey(aesSecret)

        const keyWithPasswordChanged = await keyService.changeKeySecret(key, aesSecret, aesSecretUpdate)

        expect(key.publicKey).toBe(keyWithPasswordChanged.publicKey)
        expect(key._id).toBe(keyWithPasswordChanged._id)

        expect(encryptionService.decryptAES(key.privateKey, aesSecret))
            .toBe(encryptionService.decryptAES(keyWithPasswordChanged.privateKey, aesSecretUpdate))
    })
})
