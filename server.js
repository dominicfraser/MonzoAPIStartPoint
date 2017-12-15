const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const dotEnv = require('dotenv').load()
const request = require('request')
const session = require('express-session')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('client/build'))

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}))

app.get('/whoami', (req, res) => {
console.log('whoami server request')  
  request.get('https://api.monzo.com/ping/whoami', {
      'auth': {
          'bearer': req.session.access_token
        }
      }, (error, response, body) => {
    if (response.statusCode !== 200) {
      console.log('Not 200')
      if (error) {
        console.log('Error: ', error)
      }
      return 
    } else {
      console.log('whoami body: ', body)
      res.send(body) 
    }
  })
})

app.get('/currentaccount', (req, res) => {
console.log('currentaccount server request')  
  request.get('https://api.monzo.com/accounts?account_type=uk_retail', {
      'auth': {
          'bearer': req.session.access_token
        }
      }, (error, response, body) => {
    if (response.statusCode !== 200) {
      console.log('Not 200')
      if (error) {
        console.log('Error: ', error)
      }
      return 
    } else {
      console.log('currentaccount body: ', body)
      const bodyObj = JSON.parse(body)

      req.session.current_acc_id = bodyObj.accounts[0].id

console.log('id: ',req.session.current_acc_id)

    }
  })
})

app.get('/balance', (req, res) => {
console.log('balance server request')
console.log('id: ', req.session.current_acc_id)
  const url = 'https://api.monzo.com/balance?account_id=' + req.session.current_acc_id
console.log(url)

  request.get(url, {
      'auth': {
          'bearer': req.session.access_token
        }
      }, (error, response, body) => {
    if (response.statusCode !== 200) {
      console.log('Not 200')
      if (error) {
        console.log('Error: ', error)
      }
      return 
    } else {
      console.log('balance body: ', body)
      res.send(body) 
    }
  })
})

app.get('/authorised', (req, res) => {
  console.log("sending POST request to exchange authorization code for access token")

  request.post(
      'https://api.monzo.com/oauth2/token',
      { form: {
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.REDIRECT_URI,
        code: req.query.code
        }
      },
      (error, response, body) => {
        if (response.statusCode !== 200) {
          console.log('Not 200')
          if (error) {
            console.log('Error: ', error)
          }
          return 
        } else {
          res.sendFile(path.join(__dirname + '/client/build/index.html'))

          if(process.env.STATE === req.query.state){
            //Monzo Docs: If this value differs from what you sent, you must abort the authentication process.

            const bodyObj = JSON.parse(body)

            req.session.access_token = bodyObj.access_token
            req.session.expires_in = bodyObj.expires_in
            req.session.refresh_token = bodyObj.refresh_token
            req.session.user_id = bodyObj.user_id
          }
        } 
      }
  )
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const server = app.listen(80, () => {
  const host = server.address().address
  const port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})