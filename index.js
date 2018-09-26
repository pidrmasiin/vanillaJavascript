const http = require('http')
const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./utils/config')

const questionRouter = require('./controllers/question')

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('front')) 

app.use('/api/questions', questionRouter)


const server = http.createServer(app)

server.listen(config.port || 3003, () => {
    console.log(`Server running on port ${config.port}`)
  })

const error = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  app.use(error)
  
server.on('close', () => {
    mongoose.connection.close()
  })
  
module.exports = {
    app, server
}