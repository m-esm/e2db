/* eslint-disable no-undef */
import { EncryptionService } from './encryption.service'

describe('Encryption Service', () => {
  let encryptionService: EncryptionService

  beforeEach(() => {
    encryptionService = new EncryptionService()
  })

  it('Should encrypt with AES', () => {
    const encrypted = encryptionService.encryptAES('12356', 'test')
    expect(typeof encrypted).toBe('string')
  })

  it('Should decrypt with AES', () => {
    const input = '123456'

    const encrypted = encryptionService.encryptAES(input, 'test')
    const decrypted = encryptionService.decryptAES(encrypted, 'test')
    expect(input).toEqual(decrypted)
  })

  it('Should create initialization vector', () => {
    const iv = encryptionService.createIv('test')

    // it should be 128 bits
    expect(iv.byteLength).toBe(128 / 8)
  })

  it('Should generate RSA key pairs', async () => {
    const {
      privateKey,
      publicKey
    } = await encryptionService.generateRSAKeys()

    expect(typeof privateKey).toBe('string')
    expect(typeof publicKey).toBe('string')
  })
})
