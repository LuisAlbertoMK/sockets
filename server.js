const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: 'http://localhost:4200', // URL de tu app Angular
    methods: ['GET', 'POST']
  }
});

// Servir una página HTML simple
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Manejar conexiones de Socket.IO
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Escuchar mensajes del cliente
  socket.on('cliente', (msg) => {
    console.log('cliente', msg);
    
    // Emitir el mensaje a todos los clientes conectados
    io.emit('cliente', msg);
  });

  // Escuchar mensajes del vehiculos
  socket.on('vehiculos', (msg) => {
    // Emitir el mensaje a todos los vehiculoss conectados
    io.emit('vehiculos', msg);
  });

  // Manejar desconexión
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Iniciar el servidor
server.listen(3001, () => {
  console.log('Servidor escuchando en http://localhost:3001');
});