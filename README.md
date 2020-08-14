> # :fire: :hammer: Under heavy development


## Why?

For the sake of security and privacy for users and their data. services need only have access to part of user's data which they granted access to, remaining data should be only decrypted on user read demand. E2DB is providing a set of tools that 
will help you with this.

## What?

- Sensitive and private information in database records
- Private stored files on buckets and storages

## When?

When inserting the document, it should encrypt specific fields of a document that only could be decrypted when reading with a key.

## How?

To ensure data is end to end encrypted on your backend:

- Encrypt sensitive part of the document with AES

  - Keep AES secret encrypted by the RSA key alongside the document.

- RSA public key is available in raw format to encrypt random AES secret which is used to encrypt database records/documents.
- RSA private keys need to be encrypted using AES and persisted. the
  secret key for this AES cipher is our "cloud password"

- When the cloud password changes, only RSA keys need to be encrypted again.

- Cloud passwords should always be received from the client-side and not persisted on the server-side.

  - To prevent leaking cloud passwords in clear text format in logs or etc, we need to encrypt them by an hourly rotated secret which is only available on-memory with specific expire time.

- Documents AES secret could be encrypted by multiple keys.
