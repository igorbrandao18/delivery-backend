import { IsOptional, IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRestaurantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  internalName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  liveFlag?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  demoFlag?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address1: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address2: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address3: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  county: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  postcode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  timezoneOffset: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  locale: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  timeZone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ccy: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ccySymbol: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
} 