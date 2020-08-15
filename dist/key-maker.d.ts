import { Key } from './key';
export declare class KeyMaker {
    private readonly encryption;
    createKey(aesSecret: string, rsaPass: string): Promise<Key>;
    changeKeySecret(key: Key, oldSecret: string, newSecret: string): Promise<Key>;
}
