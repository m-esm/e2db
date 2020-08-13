/* eslint-disable no-undef */
import { EncryptionService } from './encryption.service'

describe('Encryption Service', () => {
  let encryptionService: EncryptionService

  beforeEach(() => {
    encryptionService = new EncryptionService()
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
