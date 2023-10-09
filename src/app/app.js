const express = require('express')
const router = require('../routes/router')
const app = express()

app.use(router)
module.exports = app