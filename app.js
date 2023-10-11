const express = require("express")
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const debug = require('debug')

const app = express()

app.use(logger('dev'))    // log request components (URL/method) to terminal
app.use(express.json())    // parse JSON request body
app.use(express.urlencoded({ extended: false }))    // parse urlencoded request body
app.use(cookieParser())    // parse cookies as an object on req.cookies
app.use(express.static(path.join(__dirname, 'public')))    // serve the static files in the public folder



// Attach Express routers
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')     // update the import file path
const receiptsRouter = require('./routes/receipts')

app.use('/', indexRouter)
app.use('/users', usersRouter)     // update the path
app.use('/receipts', receiptsRouter)


// Middleware that gives unmatched routes a 404 error as JSON
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.statusCode = 404
    next(err)
  })
  
  const serverErrorLogger = debug('backend:error')
  
  // Runs when a route handler returns error or invokes next with err arg
  app.use((err, req, res, next) => {
    serverErrorLogger(err)
    const statusCode = err.statusCode || 500
    res.status(statusCode)
    res.json({
      message: err.message,
      statusCode,
      errors: err.errors
    })
  })
  


module.exports = app