const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const dotEnv = require('dotenv').load()
const session = require('express-session')
const controller = require('./controllers/indexController')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('client/build'))

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}))

app.use(controller)

const server = app.listen(80, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})