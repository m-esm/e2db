export interface EncryptedModel {
    [key: string]: any;
    _cipherKeys: {
        [key: string]: string;
    };
    _cipherFields: string[];
}
