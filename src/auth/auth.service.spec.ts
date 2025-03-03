import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

const mockUser = { id: 1, email: 'test@example.com', password: 'password' };

const mockJwtService = {
  sign: jest.fn().mockReturnValue('token'),
};

const mockPrismaService = {
  user: {
    create: jest.fn().mockResolvedValue(mockUser),
    findUnique: jest.fn().mockResolvedValue(mockUser),
  },
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register a user', async () => {
    const createUserDto: CreateUserDto = { email: 'test@example.com', password: 'password', name: 'Test User' };
    const user = await service.register(createUserDto);
    expect(user).toEqual(mockUser);
  });

  it('should login a user and return a token', async () => {
    const loginDto: LoginDto = { email: 'test@example.com', password: 'password' };
    const result = await service.login(loginDto);
    expect(result).toHaveProperty('accessToken');
  });

  it('should throw an error for invalid credentials', async () => {
    const loginDto: LoginDto = { email: 'test@example.com', password: 'wrongpassword' };
    await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
  });
});