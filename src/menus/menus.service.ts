import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItem } from '@prisma/client';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuItemDto: CreateMenuItemDto, restaurantId: number): Promise<MenuItem> {
    return this.prisma.menuItem.create({
      data: {
        ...createMenuItemDto,
        restaurantId,
      },
    });
  }

  async findAll(restaurantId: number): Promise<MenuItem[]> {
    return this.prisma.menuItem.findMany({
      where: {
        restaurantId,
      },
    });
  }

  async findOne(id: number, restaurantId: number): Promise<MenuItem> {
    const menuItem = await this.prisma.menuItem.findFirst({
      where: {
        id,
        restaurantId,
      },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem;
  }

  async update(id: number, updateMenuItemDto: UpdateMenuItemDto, restaurantId: number): Promise<MenuItem> {
    try {
      return await this.prisma.menuItem.update({
        where: {
          id,
          restaurantId,
        },
        data: updateMenuItemDto,
      });
    } catch (error) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
  }

  async remove(id: number, restaurantId: number): Promise<MenuItem> {
    try {
      return await this.prisma.menuItem.delete({
        where: {
          id,
          restaurantId,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
  }
}
