const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: ['https://apputos.app','http://localhost:4200','https://speed-pro-desarrollo.web.app'], // URL de tu app Angular
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
    // Emitir el mensaje a todos los clientes conectados
    io.emit('cliente', msg);
  });
  // Escuchar mensajes del vehiculos
  socket.on('vehiculo', (msg) => {
    // Emitir el mensaje a todos los vehiculoss conectados
    io.emit('vehiculo', msg);
  });
  // Escuchar mensajes del modelo
  socket.on('modelo', (msg) => io.emit('modelo', msg))
  // Escuchar mensajes del gasto operacion
  socket.on('gastos_operacion', (msg) => io.emit('gastos_operacion', msg))
  // Escuchar mensajes del gasto orden
  socket.on('gastos_orden', (msg) => io.emit('gastos_orden', msg))
  // Escuchar mensajes del pagos orden
  socket.on('pagos_orden', (msg) => io.emit('pagos_orden', msg))
  // Escuchar mensajes del gasto operacion
  socket.on('gastos_operacion', (msg) => io.emit('gastos_operacion', msg))
  // escuchar empresas
  socket.on('empresa', (msg) => io.emit('empresa', msg))
  socket.on('actualizacion', (msg) => io.emit('actualizacion', true))
  // Manejar desconexión
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

// Iniciar el servidor
server.listen(3001, () => {
  console.log('Servidor escuchando en http://localhost:3001');
});