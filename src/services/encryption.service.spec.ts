import { EncryptionService } from "./encryption.service";

describe("Encryption Service", () => {

  let encryptionService: EncryptionService;

  beforeEach(() => {
    encryptionService = new EncryptionService();
  })

  it("Should create initialization vector", () => {
    const iv = encryptionService.createIv('test');

    // it should be 128 bits
    expect(iv.byteLength).toBe(128 / 8);
    
  });
});
