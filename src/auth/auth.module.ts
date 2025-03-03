import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'your_secret_key', // Replace with a secure secret key
    signOptions: { expiresIn: '60s' }, // Token expiration time
  })],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],
  exports: [JwtService], // Export JwtService here
})
export class AuthModule {} 