const io = require('socket.io-client');

const socket = io('http://localhost:3000'); // Ajuste a porta conforme necessário

socket.on('connect', () => {
  console.log('Cliente conectado ao servidor WebSocket');
});

socket.on('newOrder', (order) => {
  console.log('Novo pedido recebido:', order);
});

socket.on('disconnect', () => {
  console.log('Cliente desconectado do servidor WebSocket');
}); 