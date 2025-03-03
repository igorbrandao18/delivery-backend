import { IsString, IsNumber, IsOptional, IsUrl, IsEnum } from 'class-validator';

export enum MenuItemCategory {
  APPETIZER = 'APPETIZER',
  MAIN_COURSE = 'MAIN_COURSE',
  DESSERT = 'DESSERT',
  BEVERAGE = 'BEVERAGE',
  SIDE_DISH = 'SIDE_DISH',
}

export class CreateMenuItemDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsUrl()
  @IsOptional()
  image?: string;

  @IsEnum(MenuItemCategory)
  category: MenuItemCategory;
} 