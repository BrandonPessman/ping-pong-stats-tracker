import React, { useState, useEffect } from 'react'
import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:8001')

export default function Dashboard() {
  const [players, setPlayers] = useState([])

  socket.emit('init')

  socket.on('load', res => {
    var newPlayers = []
    for (let i = 0; i < res.length; i++) {
      newPlayers[i] = (
        <p>
          First: {res[i].first} Last: {res[i].last} Wins: {res[i].wins} Losses:{' '}
          {res[i].losses}
        </p>
      )
    }

    setPlayers(newPlayers)
  })

  return (
    <div>
      <h1>Ping Pong</h1>
      {players}
    </div>
  )
}
