import { Encryption } from './encryption';
import { Key } from './key';
import { KeyMaker } from './key-maker';
import { EncryptedModel } from './interfaces/encrypted-model.interface';
export declare class Cipher {
    static keyMaker: KeyMaker;
    static encryption: Encryption;
    static encryptModel(model: any, keys: Key[], opts: {
        fields?: string[];
        exclude?: string[];
    }): any;
    static decryptModel<A = any>(model: EncryptedModel, key: Key, cloudPassword: string, rsaPassphrase?: string): A;
}
