import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { JwtService } from '@nestjs/jwt';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let service: RestaurantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [
        {
          provide: RestaurantsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
    service = module.get<RestaurantsService>(RestaurantsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a restaurant', async () => {
      const createRestaurantDto: CreateRestaurantDto = {
        name: 'Test Restaurant',
        email: 'test@example.com',
        password: 'password123',
        address1: '123 Test St',
        city: 'Test City',
        county: 'Test County',
        postcode: '12345',
        country: 'Test Country',
        timezoneOffset: '+00:00',
        locale: 'en',
        timeZone: 'UTC',
        ccy: 'USD',
        ccySymbol: '$',
        currency: 'USD',
        internalName: 'test',
        liveFlag: 1,
        demoFlag: 0,
        id: 1,
      };

      const now = new Date();
      jest.spyOn(service, 'create').mockResolvedValue({
        ...createRestaurantDto,
        address2: createRestaurantDto.address2 || null,
        address3: createRestaurantDto.address3 || null,
        createdAt: now,
        updatedAt: now,
      });

      expect(await controller.create(createRestaurantDto)).toEqual({
        ...createRestaurantDto,
        address2: createRestaurantDto.address2 || null,
        address3: createRestaurantDto.address3 || null,
        createdAt: now,
        updatedAt: now,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of restaurants', async () => {
      const now = new Date();
      const result = [
        {
          id: 1,
          name: 'Test Restaurant',
          email: 'test@example.com',
          password: 'password123',
          address1: '123 Test St',
          city: 'Test City',
          county: 'Test County',
          postcode: '12345',
          country: 'Test Country',
          timezoneOffset: '+00:00',
          locale: 'en',
          timeZone: 'UTC',
          ccy: 'USD',
          ccySymbol: '$',
          currency: 'USD',
          address2: null,
          address3: null,
          createdAt: now,
          updatedAt: now,
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update a restaurant', async () => {
      const updateRestaurantDto: UpdateRestaurantDto = {
        name: 'Updated Restaurant',
        address1: '456 Updated St',
        city: 'Updated City',
        county: 'Updated County',
        postcode: '67890',
        country: 'Updated Country',
        timezoneOffset: '+00:00',
        locale: 'en',
        timeZone: 'UTC',
        ccy: 'USD',
        ccySymbol: '$',
        currency: 'USD',
        address2: null,
        address3: null,
        id: 1,
      };

      const now = new Date();
      jest.spyOn(service, 'update').mockResolvedValue({
        ...updateRestaurantDto,
        email: 'test@example.com',
        password: 'password123',
        createdAt: now,
        updatedAt: now,
      });

      expect(await controller.update('1', updateRestaurantDto)).toEqual({
        ...updateRestaurantDto,
        email: 'test@example.com',
        password: 'password123',
        createdAt: now,
        updatedAt: now,
      });
    });
  });

  describe('remove', () => {
    it('should remove a restaurant', async () => {
      const now = new Date();
      jest.spyOn(service, 'remove').mockResolvedValue({
        id: 1,
        name: 'Test Restaurant',
        email: 'test@example.com',
        password: 'password123',
        address1: '123 Test St',
        city: 'Test City',
        county: 'Test County',
        postcode: '12345',
        country: 'Test Country',
        timezoneOffset: '+00:00',
        locale: 'en',
        timeZone: 'UTC',
        ccy: 'USD',
        ccySymbol: '$',
        currency: 'USD',
        address2: null,
        address3: null,
        createdAt: now,
        updatedAt: now,
      });

      expect(await controller.remove('1')).toEqual({
        id: 1,
        name: 'Test Restaurant',
        email: 'test@example.com',
        password: 'password123',
        address1: '123 Test St',
        city: 'Test City',
        county: 'Test County',
        postcode: '12345',
        country: 'Test Country',
        timezoneOffset: '+00:00',
        locale: 'en',
        timeZone: 'UTC',
        ccy: 'USD',
        ccySymbol: '$',
        currency: 'USD',
        address2: null,
        address3: null,
        createdAt: now,
        updatedAt: now,
      });
    });
  });
}); 