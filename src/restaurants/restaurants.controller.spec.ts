import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let service: RestaurantsService;
  let createRestaurantDto: CreateRestaurantDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [RestaurantsService, {
        provide: PrismaService,
        useValue: {
          restaurant: {
            create: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      }, {
        provide: JwtService,
        useValue: {
          sign: jest.fn(),
          verify: jest.fn(),
        },
      }],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
    service = module.get<RestaurantsService>(RestaurantsService);

    createRestaurantDto = {
      id: 1,
      name: 'Test Restaurant',
      internalName: 'Test',
      description: 'A test restaurant',
      liveFlag: 1,
      demoFlag: 0,
      address1: '123 Test St',
      address2: null,
      address3: null,
      city: 'Test City',
      county: 'Test County',
      postcode: '12345',
      country: 'Test Country',
      timezoneOffset: 'UTC',
      locale: 'en-US',
      timeZone: 'UTC',
      ccy: 'USD',
      ccySymbol: '$',
      currency: 'USD',
      email: 'test@example.com',
      password: 'password123',
    };
  });

  describe('create', () => {
    it('should create a restaurant', async () => {
      jest.spyOn(service, 'create').mockResolvedValue({
        ...createRestaurantDto,
        address2: createRestaurantDto.address2 || null,
        address3: createRestaurantDto.address3 || null,
      });

      expect(await controller.create(createRestaurantDto)).toEqual({
        ...createRestaurantDto,
        address2: createRestaurantDto.address2 || null,
        address3: createRestaurantDto.address3 || null,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of restaurants', async () => {
      const result = [{
        ...createRestaurantDto,
        address2: createRestaurantDto.address2 || null,
        address3: createRestaurantDto.address3 || null,
      }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a restaurant', async () => {
      const updateRestaurantDto: UpdateRestaurantDto = {
        id: 1,
        name: 'Updated Restaurant',
        internalName: 'Updated Internal Name',
        description: 'Updated description',
        liveFlag: 1,
        demoFlag: 0,
        address1: '123 Updated St',
        address2: null,
        address3: null,
        city: 'Updated City',
        county: 'Updated County',
        postcode: '54321',
        country: 'Updated Country',
        timezoneOffset: 'UTC',
        locale: 'en-US',
        timeZone: 'UTC',
        ccy: 'USD',
        ccySymbol: '$',
        currency: 'USD',
      };
      const id = 1;
      jest.spyOn(service, 'update').mockResolvedValue({
        ...updateRestaurantDto,
        id,
        address2: null,
        address3: null,
      });

      expect(await controller.update(id.toString(), updateRestaurantDto)).toEqual({
        ...updateRestaurantDto,
        id,
        address2: null,
        address3: null,
      });
    });
  });

  describe('remove', () => {
    it('should remove a restaurant', async () => {
      const id = 1;
      jest.spyOn(service, 'remove').mockResolvedValue({
        id: 1,
        name: 'Removed Restaurant',
        address1: '123 Removed St',
        address2: null,
        address3: null,
        city: 'Removed City',
        county: 'Removed County',
        postcode: '54321',
        country: 'Removed Country',
        timezoneOffset: 'UTC',
        locale: 'en-US',
        timeZone: 'UTC',
        ccy: 'USD',
        ccySymbol: '$',
        currency: 'USD',
      });

      expect(await controller.remove(id.toString())).toEqual({
        id: 1,
        name: 'Removed Restaurant',
        address1: '123 Removed St',
        address2: null,
        address3: null,
        city: 'Removed City',
        county: 'Removed County',
        postcode: '54321',
        country: 'Removed Country',
        timezoneOffset: 'UTC',
        locale: 'en-US',
        timeZone: 'UTC',
        ccy: 'USD',
        ccySymbol: '$',
        currency: 'USD',
      });
    });
  });

  describe('login', () => {
    it('should return a JWT token for valid credentials', async () => {
      const loginRestaurantDto = { email: 'test@example.com', password: 'password123' };
      const token = 'mocked_token';
      jest.spyOn(service, 'login').mockResolvedValue({ access_token: token });

      expect(await controller.login(loginRestaurantDto)).toEqual({ access_token: token });
    });
  });
}); 