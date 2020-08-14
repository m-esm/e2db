import ObjectID from 'bson-objectid'

export interface Key {

    /**
     * private RSA key, encrypted with AES, stored as base64
     */
    privateKey: string

    /**
     * Un-encrypted public RSA key
     */
    publicKey: string

    _id: ObjectID

}
