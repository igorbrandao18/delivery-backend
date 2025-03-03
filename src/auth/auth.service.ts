import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User, Restaurant } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return user;
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string; userType: string }> {
    // Primeiro tenta encontrar um usuário
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    // Se não encontrar usuário, tenta encontrar um restaurante
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { email: loginDto.email },
    });

    if (user && user.password === loginDto.password) {
      const accessToken = this.jwtService.sign({ 
        id: user.id,
        userType: 'user'
      });
      return { accessToken, userType: 'user' };
    }

    if (restaurant && restaurant.password === loginDto.password) {
      const accessToken = this.jwtService.sign({ 
        id: restaurant.id,
        userType: 'restaurant'
      });
      return { accessToken, userType: 'restaurant' };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
