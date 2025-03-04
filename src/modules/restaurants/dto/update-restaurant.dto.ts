import { IsOptional, IsNotEmpty, IsString, IsNumber, IsEmail } from 'class-validator';

export class UpdateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  internalName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  liveFlag?: number;

  @IsOptional()
  @IsNumber()
  demoFlag?: number;

  @IsNotEmpty()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2: string | null;

  @IsOptional()
  @IsString()
  address3: string | null;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  county: string;

  @IsNotEmpty()
  @IsString()
  postcode: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  timezoneOffset: string;

  @IsNotEmpty()
  @IsString()
  locale: string;

  @IsNotEmpty()
  @IsString()
  timeZone: string;

  @IsNotEmpty()
  @IsString()
  ccy: string;

  @IsNotEmpty()
  @IsString()
  ccySymbol: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;
} 