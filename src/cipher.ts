import * as uuid from 'uuid'

import { Encryption } from './encryption'
import { Key } from './key'
import { KeyMaker } from './key-maker'
import { EncryptedModel } from './interfaces/encrypted-model.interface'

export class Cipher {
    static keyMaker = new KeyMaker();
    static encryption = new Encryption();

    /**
     * Encrypts specific fields of model
     * excludes _id field by default
     * @param model
     * @param keys
     * @param opts
     */
    public static encryptModel(model: any, keys: Key[], opts: { fields?: string[] }) {
        const fields = opts.fields || Object.keys(model)

        const aesSecret = uuid.v4()

        fields.forEach(f => {
            model[f] = this.encryption.encryptAES(JSON.stringify(model[f]), aesSecret)
        })

        model._cipherKeys = keys.reduce((prev, current) => {
            prev[current._id.toHexString()] = this.encryption.encryptRSA(aesSecret, current.publicKey)
            return prev
        }, {})

        model._cipherFields = fields

        return model
    }

    public static decryptModel<A = any>(model: EncryptedModel, key: Key, cloudPassword: string, rsaPassphrase = ''): A {
        const privateKey = this.encryption.decryptAES(key.privateKey, cloudPassword)

        model._cipherFields.forEach(field => {
            const aesSecret = this.encryption.decryptRSA(model._cipherKeys[key._id.toHexString()], privateKey, rsaPassphrase)
            model[field] = JSON.parse(this.encryption.decryptAES(model[field], aesSecret))
        })

        delete model._cipherFields
        delete model._cipherKeys

        return <A><unknown>model
    }
}
