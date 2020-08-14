/* eslint-disable no-undef */
import { KeyMaker } from './key-maker'
import { Encryption } from './encryption'

describe('Key Maker ', () => {
    let keyMaker: KeyMaker
    let encryption: Encryption

    beforeEach(() => {
        keyMaker = new KeyMaker()
        encryption = new Encryption()
    })

    it('should create a key', async () => {
        const aesSecret = '123456'
        const toEncrypt = 'test'

        const { privateKey, publicKey } = await keyMaker.createKey(aesSecret)

        const encrypted = encryption.encryptRSA(toEncrypt, publicKey)

        const decrypted = encryption.decryptRSA(encrypted, encryption.decryptAES(privateKey, aesSecret))

        expect(decrypted).toBe(toEncrypt)
    })

    it('should change a key secret', async () => {
        const aesSecret = '111'
        const aesSecretUpdate = '222'

        const key = await keyMaker.createKey(aesSecret)

        const keyWithPasswordChanged = await keyMaker.changeKeySecret(key, aesSecret, aesSecretUpdate)

        expect(key.publicKey).toBe(keyWithPasswordChanged.publicKey)
        expect(key._id).toBe(keyWithPasswordChanged._id)

        expect(encryption.decryptAES(key.privateKey, aesSecret))
            .toBe(encryption.decryptAES(keyWithPasswordChanged.privateKey, aesSecretUpdate))
    })
})
