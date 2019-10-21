import React from 'react'
import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:8001')

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      players: '',
    }

    this.handlePlayerUpdate = this.handlePlayerUpdate.bind(this)
  }

  componentDidMount() {
    socket.emit('init')

    socket.on('load', res => {
      var newPlayers = []
      for (let i = 0; i < res.length; i++) {
        newPlayers[i] = (
          <div key={i}>
            <h2>
              {res[i].first} {res[i].last}
            </h2>
            <h3>Record</h3>
            <button id={'+w' + res[i].last} onClick={this.handlePlayerUpdate}>
              +
            </button>{' '}
            <button id={'-w' + res[i].last} onClick={this.handlePlayerUpdate}>
              -
            </button>{' '}
            {res[i].wins} - {res[i].losses}{' '}
            <button id={'+l' + res[i].last} onClick={this.handlePlayerUpdate}>
              +
            </button>{' '}
            <button id={'-l' + res[i].last} onClick={this.handlePlayerUpdate}>
              -
            </button>
            <h3>Ratio</h3>
            <p>Ratio: {res[i].wins / res[i].losses}</p>
            <br />
          </div>
        )
      }

      this.setState({ players: newPlayers })
    })
  }

  handlePlayerUpdate(event) {
    var elementId = event.target.id

    var payload = {
      operator: elementId[0],
      type: elementId[1],
      id: elementId.slice(2, elementId.length),
    }

    socket.emit('update player', payload)
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Ping Pong Tracker</h1>
        <hr></hr>
        {this.state.players}
      </div>
    )
  }
}
