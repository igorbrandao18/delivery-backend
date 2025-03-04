import { IsNotEmpty, IsString, IsOptional, IsNumber, IsEmail } from 'class-validator';

export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  internalName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  liveFlag: number;

  @IsNotEmpty()
  @IsNumber()
  demoFlag: number;

  @IsNotEmpty()
  @IsString()
  address1: string;

  @IsOptional()
  @IsString()
  address2?: string | null;

  @IsOptional()
  @IsString()
  address3?: string | null;

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

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;
} 