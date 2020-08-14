import ObjectID from 'bson-objectid';
export interface Key {
    privateKey: string;
    publicKey: string;
    _id: ObjectID;
}
