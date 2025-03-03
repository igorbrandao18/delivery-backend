import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderItemDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new order', () => {
      const createOrderDto: CreateOrderDto = {
        items: [{ id: 1, quantity: 2 }],
        restaurantId: 1,
        userId: 1,
      };
      const result = service.create(createOrderDto);
      expect(result).toHaveProperty('id');
      expect(result.restaurantId).toEqual(createOrderDto.restaurantId);
    });
  });

  describe('findAll', () => {
    it('should return an array of orders', () => {
      const createOrderDto: CreateOrderDto = {
        items: [{ id: 1, quantity: 2 }],
        restaurantId: 1,
        userId: 1,
      };
      service.create(createOrderDto);
      const result = service.findAll();
      expect(result.length).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return an order by id', () => {
      const createOrderDto: CreateOrderDto = {
        items: [{ id: 1, quantity: 2 }],
        restaurantId: 1,
        userId: 1,
      };
      const orderItem = service.create(createOrderDto);
      const result = service.findOne(orderItem.id);
      expect(result).toEqual(orderItem);
    });
  });

  describe('update', () => {
    it('should update an order', () => {
      const createOrderDto: CreateOrderDto = {
        items: [{ id: 1, quantity: 2 }],
        restaurantId: 1,
        userId: 1,
      };
      const orderItem = service.create(createOrderDto);
      const updateOrderDto: UpdateOrderDto = { userId: 2 };
      const result = service.update(orderItem.id, updateOrderDto);
      expect(result).not.toBeNull();
      if (result) {
        expect(result.userId).toEqual(2);
      }
    });
  });

  describe('remove', () => {
    it('should remove an order', () => {
      const createOrderDto: CreateOrderDto = {
        items: [{ id: 1, quantity: 2 }],
        restaurantId: 1,
        userId: 1,
      };
      const orderItem = service.create(createOrderDto);
      const result = service.remove(orderItem.id);
      expect(result).toHaveLength(1);
      expect(service.findOne(orderItem.id)).toBeUndefined();
    });
  });
});
