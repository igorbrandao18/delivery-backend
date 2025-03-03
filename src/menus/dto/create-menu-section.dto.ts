import { IsString, IsOptional, IsNumber, IsBoolean, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMenuImageDto {
  @IsString()
  image: string;
}

export class CreateMenuSectionDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  position?: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  visible?: boolean;

  @IsArray()
  @IsOptional()
  images?: CreateMenuImageDto[];
} 