const uuid = require('uuid')
const objectId = require('bson-objectid')
const app = require('express')()
const bodyParser = require('body-parser')
const port = Number(process.env.PORT) || 3000
const globalRsaPass = 'GLOBAL_RSA_PASS'

const cipher = require('../').Cipher

const users = []
const documents = []

app.use(bodyParser.json())

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`))
app.get('/source', (req, res) => res.sendFile(__filename))
app.get('/db', (req, res) => res.json({ users, documents }))

app.post('/register', async (req, res) => {
  const user = {
    token: uuid.v4(),
    name: req.body.name,
    key: await cipher.keyMaker.createKey(req.body.cloudPass, globalRsaPass)
  }

  users.unshift(user)
  if (users.length > 100) users.pop()
  console.log({ user })
  res.json(user)
})

app.post('/documents', (req, res) => {
  const token = req.headers.authorization

  const key = users.find((p) => p.token === token).key
  const encryptedDocument = {
    _id: objectId().toHexString(),
    ...cipher.encryptModel(req.body, [key])
  }

  documents.unshift(encryptedDocument)
  if (documents.length > 100) documents.pop()

  console.log({ encryptedDocument })
  res.json(encryptedDocument)
})

app.get('/documents/:_id', (req, res) => {
  const token = req.headers.authorization

  const key = users.find((p) => p.token === token).key
  const encryptedDocument = documents.find((p) => p._id === req.params._id)
  const decryptedDocument = cipher.decryptModel(
    encryptedDocument,
    key,
    req.headers['x-cloud-pass'],
    globalRsaPass
  )

  console.log({ decryptedDocument })
  res.json(decryptedDocument)
})

app.listen(port, () => {
  console.log(`Started listening on http://localhost:${port}`)
})
