import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  internalName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  liveFlag: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  demoFlag: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address1: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address2?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address3?: string | null;

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
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
} 