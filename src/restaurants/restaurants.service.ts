import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Restaurant } from '@prisma/client';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { LoginRestaurantDto } from './dto/login-restaurant.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService, private readonly jwtService: JwtService) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    return this.prisma.restaurant.create({
      data: createRestaurantDto,
    });
  }

  async findAll(): Promise<Restaurant[]> {
    return this.prisma.restaurant.findMany();
  }

  async findOne(id: number): Promise<Restaurant | null> {
    return this.prisma.restaurant.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    return this.prisma.restaurant.update({
      where: { id },
      data: updateRestaurantDto,
    });
  }

  async remove(id: number): Promise<Restaurant> {
    return this.prisma.restaurant.delete({
      where: { id },
    });
  }

  async login(loginRestaurantDto: LoginRestaurantDto) {
    // Aqui você deve implementar a lógica de autenticação, como verificar as credenciais no banco de dados.
    // Se as credenciais estiverem corretas, retorne um token JWT.
    const { email, password } = loginRestaurantDto;

    // Lógica de autenticação (exemplo simplificado)
    if (email === 'test@example.com' && password === 'password123') {
      const payload = { email }; // Payload do token
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new Error('Invalid credentials');
  }
} 