const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 3000

const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// Handle a socket connection request from client
const connections = []
const maxConnections = 4;

io.on('connection', socket => {
    // Find an available player slot
    let playerIndex = -1;
    for (let i = 0; i < maxConnections; i++) {
        if (connections[i] == null) {
            playerIndex = i
            break
        }
    }

    socket.emit('player-number', playerIndex)
    console.log(`Player ${playerIndex} has connected`)

    if (playerIndex == -1)
        return

    connections[playerIndex] = false

    socket.on('disconnect', () => {
        console.log(`Player ${playerIndex} disconnected`)
        connections[playerIndex] = null
    })
})

