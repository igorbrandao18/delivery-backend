import { IsString, IsNumber, IsOptional, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum MenuItemCategory {
  APPETIZER = 'APPETIZER',
  MAIN_COURSE = 'MAIN_COURSE',
  DESSERT = 'DESSERT',
  BEVERAGE = 'BEVERAGE',
  SIDE_DISH = 'SIDE_DISH',
}

export class CreateMenuImageDto {
  @IsString()
  image: string;
}

export class CreateModifierItemDto {
  @IsString()
  name: string;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  maxChoices?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  position?: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  visible?: boolean;

  @IsString()
  @IsOptional()
  availabilityType?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  qty?: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  available?: boolean;
}

export class CreateMenuModifierDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  minChoices?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  maxChoices?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateModifierItemDto)
  items: CreateModifierItemDto[];
}

export class CreateMenuItemDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  alcoholic?: boolean;

  @IsNumber()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  position?: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  visible?: boolean;

  @IsString()
  @IsOptional()
  availabilityType?: string;

  @IsString()
  @IsOptional()
  sku?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  available?: boolean;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMenuImageDto)
  images?: CreateMenuImageDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMenuModifierDto)
  modifiers?: CreateMenuModifierDto[];
} 