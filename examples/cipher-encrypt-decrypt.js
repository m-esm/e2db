const Cipher = require('../dist').Cipher

async function doExample() {
  const userCloudPassword = 'user cloud password'
  const globalRsaPass = 'global rsa passphrase'
  // key.privateKey is encrypted with AES secret ( user cloud password )
  // key.privateKey is also protected by rsa pass phrase ( global rsa pass for your app )
  // key._id is auto generated bson object id
  const key = await Cipher.keyMaker.createKey(userCloudPassword, globalRsaPass)

  const model = {
    message: 'hello world',
    secretMessage: 'privacy matters'
  }

  // models could be encrypted by multiple keys
  const encryptedModel = Cipher.encryptModel(model, [key], {
    fields: ['secretMessage']
  })

  console.log(JSON.stringify(encryptedModel, null, 2))

  // outputs:
  //   {
  //     "message": "hello world",
  //     "secretMessage": "P9acGm+rBD4TaUpNRZVx2/5UW8BY0d0frHHiF2l6flU=",
  //     "_cipherKeys": {
  //       "5f38843239e984113d8eb8fa": "mqxbQ7i+80kfMVmTxB8Iq+dLmP2TWOQ95+lmiYCmYrir/qAcTeMGRH/SiWZwE5Hy6KfzKe3pDFac9W5dEPfLtFB/U5izMKCXH5K7MEiB8/FEan1gTvakvgNXZdzTaE6eaRD0fvsld0XNGl6J+dVdDmh4Sr1C7CBdx0uYoEVZd+RD/028V7jpaLs/zxDMbzcOhujHb7LRadDpqD6IsXLX+g9qzv7PpVEunQUCfApPcvxX9W8ddqzl+fMGZPt/Lo6i6IFHZAS5roGbDBH85nkj09TEMfAHzwwEbllcGR5yuQMy5PKhtEK44WsOA9CyG3AomCilLRskxoVaOXtjTAf9X7DZfPEgSHdYuiclK5q/FgF1ps2a9341muKTimnztcmveE+i1ncIoro4JMAHvEx7dqOhniC73VKb3PAbuVhXFpVB5r1Tcpk4w/AUvH4NtOGD71J6ORMBAsB0qANJnp3PPPZ2irckRh0joY9zcCOpUPnioquow+BFoEbVCP772yqCaigZmluEDU1UIWKJh87auVsC2OBd7R/oD9eYpQ8cSbQ5K9cprLUGFSfJ8MeR3rNhcRSqxZ7nZdlqrLtWWmO3y8K7FvRHLnK2ZVpOLjZt34L9hPQHMocFnmQGqakpNeOdkRxLOM6P4LQuFsamnBwblhrBf+0W8P1hLRua7nifaI0="
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
  )

  console.log(JSON.stringify(decryptedModel, null, 2))

  // outputs:
  // {
  //   "message": "hello world",
  //   "secretMessage": "privacy matters"
  // }
}

doExample()
