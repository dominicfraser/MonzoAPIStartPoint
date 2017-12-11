const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const dotEnv = require('dotenv').load()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.use(express.static('client/build'))

const server = app.listen(80, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})