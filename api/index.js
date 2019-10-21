const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = 8000

const io = require('socket.io')()

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

var data = []
data[0] = {
  first: 'Brandon',
  last: 'Pessman',
  wins: 0,
  losses: 0,
}
data[1] = {
  first: 'James',
  last: 'Klotz',
  wins: 0,
  losses: 0,
}
data[2] = {
  first: 'Collin',
  last: 'Goldsworthy',
  wins: 0,
  losses: 0,
}

io.listen(8001)
io.on('connection', socket => {
  console.log('Client Connected!')

  socket.on('disconnect', () => {
    console.log('Client Disconnected!')
  })

  socket.on('init', () => {
    socket.emit('load', data)
  })

  socket.on('new player', () => {
    var data = { data: 'Test Data' }
    socket.emit('load', data)
  })

  socket.on('update player', payload => {
    var player = payload.id
    var operator = payload.operator
    var type = payload.type

    var index = -1
    for (let i = 0; i < data.length; i++) {
      if (data[i].last == player) {
        index = i
      }
    }

    if (type == 'w') {
      if (operator == '+') {
        data[index].wins++
      } else {
        data[index].wins--
      }
    } else {
      if (operator == '+') {
        data[index].losses++
      } else {
        data[index].losses--
      }
    }

    socket.emit('load', data)
  })
})

app.listen(port, () => {
  console.log('Server is up and Running on Port: ' + port)
})
