const express = require('express')
const request = require('request')
const session = require('express-session')

const monzoAPIRouter = new express.Router()

monzoAPIRouter.get('/whoami', (req, res) => {
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

monzoAPIRouter.get('/currentaccount', (req, res) => {
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
      const bodyObj = JSON.parse(body)

      req.session.current_acc_id = bodyObj.accounts[0].id

      res.send({ gotId: true })
      //seems that session is only automatically saved if you send data back,
      //otherwise you must call .save() to avoid undefined
      // req.session.save()
    }
  })
})

monzoAPIRouter.get('/balance', (req, res) => {
  console.log('balance server request')
  const url = 'https://api.monzo.com/balance?account_id=' + req.session.current_acc_id
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
      res.send(body) 
    }
  })
})

monzoAPIRouter.get('/transactions', (req, res) => {
  console.log('transactions server request')
  const url = 'https://api.monzo.com/transactions?account_id=' + req.session.current_acc_id + "&limit=10"
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
      res.send(body) 
    }
  })
})

module.exports = monzoAPIRouter