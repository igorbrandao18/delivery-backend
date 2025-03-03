import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
            restaurant: {
              findUnique: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('should register a user', async () => {
      const createUserDto: CreateUserDto = { email: 'test@example.com', password: 'password', name: 'Test User' };
      const now = new Date();
      const mockUser = {
        id: 1,
        email: createUserDto.email,
        password: createUserDto.password,
        name: createUserDto.name,
        createdAt: now,
        updatedAt: now,
      };

      jest.spyOn(prisma.user, 'create').mockResolvedValue(mockUser);

      const user = await service.register(createUserDto);
      expect(user).toEqual(mockUser);
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const loginDto: LoginDto = { email: 'test@example.com', password: 'password123' };
      const now = new Date();
      const user = {
        id: 1,
        email: loginDto.email,
        password: loginDto.password,
        name: 'Test User',
        createdAt: now,
        updatedAt: now,
      };
      const token = 'mocked_token';

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(prisma.restaurant, 'findUnique').mockResolvedValue(null);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await service.login(loginDto);

      expect(result).toEqual({ accessToken: token, userType: 'user' });
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: user.id,
        userType: 'user',
      });
    });

    it('should login a restaurant and return a token', async () => {
      const loginDto: LoginDto = { email: 'restaurant@example.com', password: 'password123' };
      const now = new Date();
      const restaurant = {
        id: 1,
        email: loginDto.email,
        password: loginDto.password,
        name: 'Test Restaurant',
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
      };
      const token = 'mocked_token';

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prisma.restaurant, 'findUnique').mockResolvedValue(restaurant);
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await service.login(loginDto);

      expect(result).toEqual({ accessToken: token, userType: 'restaurant' });
      expect(prisma.restaurant.findUnique).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: restaurant.id,
        userType: 'restaurant',
      });
    });

    it('should throw an error for invalid credentials', async () => {
      const loginDto: LoginDto = { email: 'test@example.com', password: 'wrongpassword' };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      jest.spyOn(prisma.restaurant, 'findUnique').mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
    });
  });
});