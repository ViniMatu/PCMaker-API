const express = require('express')
const router = require('../routes/router')
const cors = require('cors')
const errorHanlder = require('../error/errorHandler')
const app = express()

app.use(cors())
app.use('/api', router)
app.use(errorHanlder)
module.exports = app