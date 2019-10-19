const mongoose = require('mongoose')
const app = require('express')()
const server = require('http').createServer(app)
const port = 8000

require('dotenv').config()

mongoose
  .connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(async () => {
    app.listen(process.env.PORT, () => console.log('MongoDB Server Connected!'))
  })

const io = require('socket.io')(server)
io.on('connection', () => {
  console.log('Client Connected!')
})

server.listen(port, () => {
  console.log('Server is up and Running on Port: ' + port)
})
