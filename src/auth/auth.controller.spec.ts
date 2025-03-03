import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';

const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const createUserDto: CreateUserDto = { email: 'test@example.com', password: 'password', name: 'Test User' };
    mockAuthService.register.mockResolvedValue(createUserDto);
    const result = await controller.register(createUserDto);
    expect(result).toEqual(createUserDto);
  });

  it('should login a user and return a token', async () => {
    const loginDto: LoginDto = { email: 'test@example.com', password: 'password' };
    mockAuthService.login.mockResolvedValue({ accessToken: 'token' });
    const result = await controller.login(loginDto);
    expect(result).toHaveProperty('accessToken');
  });

  it('should throw an error for invalid credentials', async () => {
    const loginDto: LoginDto = { email: 'test@example.com', password: 'wrongpassword' };
    mockAuthService.login.mockRejectedValue(new UnauthorizedException('Invalid credentials'));
    await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException);
  });
});