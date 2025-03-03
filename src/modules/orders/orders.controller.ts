import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrdersService, Order } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(): Order[] {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Order | undefined {
    return this.ordersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Order | null {
    return this.ordersService.remove(id);
  }
}
