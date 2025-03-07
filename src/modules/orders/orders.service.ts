import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersGateway } from './orders.gateway';

interface OrderItem {
  id: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  restaurantId: number;
  userId: number;
}

@Injectable()
export class OrdersService {
  private readonly orders: Order[] = [];

  constructor(private readonly ordersGateway: OrdersGateway) {}

  create(createOrderDto: CreateOrderDto) {
    const newOrder = { id: Date.now().toString(), ...createOrderDto };
    this.orders.push(newOrder);
    this.ordersGateway.notifyNewOrder(newOrder);
    return newOrder;
  }

  findAll() {
    return this.orders;
  }

  findOne(id: string) {
    return this.orders.find(order => order.id === id);
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex > -1) {
      this.orders[orderIndex] = { ...this.orders[orderIndex], ...updateOrderDto };
      return this.orders[orderIndex];
    }
    return null;
  }

  remove(id: string): Order | null {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex > -1) {
      return this.orders.splice(orderIndex, 1)[0];
    }
    return null;
  }
}
