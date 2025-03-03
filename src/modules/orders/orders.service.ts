import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

interface OrderItem {
  id: number;
  quantity: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  restaurantId: number;
  userId: number;
}

@Injectable()
export class OrdersService {
  private readonly orders: Order[] = [];

  create(createOrderDto: CreateOrderDto) {
    const newOrder: Order = { id: Date.now().toString(), ...createOrderDto };
    this.orders.push(newOrder);
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

  remove(id: string) {
    const orderIndex = this.orders.findIndex(order => order.id === id);
    if (orderIndex > -1) {
      return this.orders.splice(orderIndex, 1);
    }
    return null;
  }
}
