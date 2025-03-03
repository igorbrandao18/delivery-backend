import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class OrdersGateway {
  @WebSocketServer() server: Server;

  notifyNewOrder(order: any) {
    this.server.emit('newOrder', order);
  }
} 