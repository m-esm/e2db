> ### :fire: :hammer: Under heavy development

# E2DB - e2e encryption for your database and files

[![NPM](https://img.shields.io/npm/v/e2db.svg)](https://www.npmjs.com/package/e2db)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/m-esm/e2db/graphs/commit-activity)
[![GitHub stars](https://img.shields.io/github/stars/m-esm/e2db.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/m-esm/e2db/stargazers/)

## Install

```sh
npm install e2db
```

## Run tests

```sh
npm run test
```

## 🚀 Usage

```js
const Cipher = require("e2db").Cipher;

async function doExample() {
  const userCloudPassword = "user cloud password";
  const globalRsaPass = "global rsa passphrase";
  // key.privateKey is encrypted with AES secret ( user cloud password )
  // key.privateKey is also protected by rsa pass phrase ( global rsa pass for your app )
  // key._id is auto generated bson object id
  const key = await Cipher.keyMaker.createKey(userCloudPassword, globalRsaPass);

  const model = {
    message: "hello world",
    secretMessage: "privacy matters",
  };

  // models could be encrypted by multiple keys
  const encryptedModel = Cipher.encryptModel(model, [key], {
    fields: ["secretMessage"],
  });

  console.log(JSON.stringify(encryptedModel, null, 2));

  // note that 5f38843239e984113d8eb8fa is our key._id
  // outputs:
  //   {
  //     "message": "hello world",
  //     "secretMessage": "P9acGm+rBD4TaUpNRZVx2/5UW8BY0d0frHHiF2l6flU=",
  //     "_cipherKeys": {
  //       "5f38843239e984113d8eb8fa": "RANDOM_AES_SECRET_ENCRYPTED_BY_RSA_KEY"
  //     },
  //     "_cipherFields": [
  //       "secretMessage"
  //     ]
  //   }

  const decryptedModel = Cipher.decryptModel(
    encryptedModel,
    key,
    userCloudPassword,
    globalRsaPass
  );

  console.log(JSON.stringify(decryptedModel, null, 2));

  // outputs:
  // {
  //   "message": "hello world",
  //   "secretMessage": "privacy matters"
  // }
}
```

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

## Resources

- https://nodejs.org/en/knowledge/cryptography/how-to-use-crypto-module/
- https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/m-esm/e2db/issues). You can also take a look at the [contributing guide](https://github.com/m-esm/e2db/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Mohsen Esmaeili <m-esm@hotmail.com>](https://github.com/m-esm).<br />
This project is [MIT](https://github.com/m-esm/e2db/blob/master/LICENSE) licensed.

### Author

👤 **Mohsen Esmaeili <m-esm@hotmail.com>**

- Twitter: [@mohsen_esm](https://twitter.com/mohsen_esm)
- LinkedIn: [@m-esm](https://linkedin.com/in/m-esm)
