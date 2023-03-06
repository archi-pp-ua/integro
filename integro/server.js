'use strict'

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const http = require('http')
const path = require('path')

const app = express()
const forms = multer()

function server (callback) {
  const viewEngine = process.env.VIEW_ENGINE || 'ejs'
  app.set('view engine', viewEngine);

  app.use(bodyParser.json({
    limit: '1024kb',
  }))
  app.use(forms.array())
  app.use(bodyParser.urlencoded({
    limit: '1024kb',
    extended: true
  }))
  app.use(bodyParser.text({
    limit: '1024kb',
    type: 'application/xml'
  }))

  app.all('*', function (req, res) {
    callback(req, res)
  })

  const srv = http.createServer(app)

  const port = process.env.PORT || 4444
  srv.listen(port)
  console.log('server started at ', port)
}

module.exports = server
