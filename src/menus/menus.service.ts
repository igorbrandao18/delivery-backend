import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { CreateMenuSectionDto } from './dto/create-menu-section.dto';
import { UpdateMenuSectionDto } from './dto/update-menu-section.dto';
import { MenuItem, MenuSection, MenuImage, MenuModifier, ModifierItem } from '@prisma/client';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  // Section operations
  async createSection(createMenuSectionDto: CreateMenuSectionDto, restaurantId: number): Promise<MenuSection> {
    const { images, ...sectionData } = createMenuSectionDto;
    
    return this.prisma.menuSection.create({
      data: {
        ...sectionData,
        restaurantId,
        images: {
          create: images?.map(img => ({ image: img.image })) || [],
        },
      },
      include: {
        images: true,
      },
    });
  }

  async findAllSections(restaurantId: number): Promise<MenuSection[]> {
    return this.prisma.menuSection.findMany({
      where: {
        restaurantId,
      },
      include: {
        images: true,
        items: {
          include: {
            images: true,
            modifiers: {
              include: {
                items: true,
              },
            },
          },
        },
      },
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findOneSection(id: number, restaurantId: number): Promise<MenuSection> {
    const section = await this.prisma.menuSection.findFirst({
      where: {
        id,
        restaurantId,
      },
      include: {
        images: true,
        items: {
          include: {
            images: true,
            modifiers: {
              include: {
                items: true,
              },
            },
          },
        },
      },
    });

    if (!section) {
      throw new NotFoundException(`Menu section with ID ${id} not found`);
    }

    return section;
  }

  async updateSection(id: number, updateMenuSectionDto: UpdateMenuSectionDto, restaurantId: number): Promise<MenuSection> {
    const { images, ...sectionData } = updateMenuSectionDto;

    try {
      return await this.prisma.menuSection.update({
        where: {
          id,
          restaurantId,
        },
        data: {
          ...sectionData,
          images: images ? {
            deleteMany: {},
            create: images.map(img => ({ image: img.image })),
          } : undefined,
        },
        include: {
          images: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Menu section with ID ${id} not found`);
    }
  }

  async removeSection(id: number, restaurantId: number): Promise<MenuSection> {
    try {
      return await this.prisma.menuSection.delete({
        where: {
          id,
          restaurantId,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Menu section with ID ${id} not found`);
    }
  }

  // Menu item operations
  async createMenuItem(createMenuItemDto: CreateMenuItemDto, sectionId: number): Promise<MenuItem> {
    const { images, modifiers, ...itemData } = createMenuItemDto;

    return this.prisma.menuItem.create({
      data: {
        ...itemData,
        sectionId,
        images: {
          create: images?.map(img => ({ image: img.image })) || [],
        },
        modifiers: {
          create: modifiers?.map(mod => ({
            name: mod.name,
            minChoices: mod.minChoices,
            maxChoices: mod.maxChoices,
            items: {
              create: mod.items.map(item => ({
                name: item.name,
                price: item.price,
                maxChoices: item.maxChoices,
                position: item.position,
                visible: item.visible,
                availabilityType: item.availabilityType,
                qty: item.qty,
                available: item.available,
              })),
            },
          })) || [],
        },
      },
      include: {
        images: true,
        modifiers: {
          include: {
            items: true,
          },
        },
      },
    });
  }

  async findAllMenuItems(sectionId: number): Promise<MenuItem[]> {
    return this.prisma.menuItem.findMany({
      where: {
        sectionId,
      },
      include: {
        images: true,
        modifiers: {
          include: {
            items: true,
          },
        },
      },
      orderBy: {
        position: 'asc',
      },
    });
  }

  async findOneMenuItem(id: number, sectionId: number): Promise<MenuItem> {
    const menuItem = await this.prisma.menuItem.findFirst({
      where: {
        id,
        sectionId,
      },
      include: {
        images: true,
        modifiers: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem;
  }

  async updateMenuItem(id: number, updateMenuItemDto: UpdateMenuItemDto, sectionId: number): Promise<MenuItem> {
    const { images, modifiers, ...itemData } = updateMenuItemDto;

    try {
      return await this.prisma.menuItem.update({
        where: {
          id,
          sectionId,
        },
        data: {
          ...itemData,
          images: images ? {
            deleteMany: {},
            create: images.map(img => ({ image: img.image })),
          } : undefined,
          modifiers: modifiers ? {
            deleteMany: {},
            create: modifiers.map(mod => ({
              name: mod.name,
              minChoices: mod.minChoices,
              maxChoices: mod.maxChoices,
              items: {
                create: mod.items.map(item => ({
                  name: item.name,
                  price: item.price,
                  maxChoices: item.maxChoices,
                  position: item.position,
                  visible: item.visible,
                  availabilityType: item.availabilityType,
                  qty: item.qty,
                  available: item.available,
                })),
              },
            })),
          } : undefined,
        },
        include: {
          images: true,
          modifiers: {
            include: {
              items: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
  }

  async removeMenuItem(id: number, sectionId: number): Promise<MenuItem> {
    try {
      return await this.prisma.menuItem.delete({
        where: {
          id,
          sectionId,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }
  }
}
