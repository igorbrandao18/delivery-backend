import { Test, TestingModule } from '@nestjs/testing';
import { MenusService } from './menus.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateMenuSectionDto } from './dto/create-menu-section.dto';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuSectionDto } from './dto/update-menu-section.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

describe('MenusService', () => {
  let service: MenusService;
  let prisma: PrismaService;

  const mockPrismaService = {
    menuSection: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    menuItem: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenusService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<MenusService>(MenusService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSection', () => {
    it('should create a menu section', async () => {
      const createMenuSectionDto: CreateMenuSectionDto = {
        name: 'Test Section',
        description: 'Test Description',
        position: 1,
        visible: true,
        images: [{ image: 'test.jpg' }],
      };

      const expectedResult = {
        id: 1,
        ...createMenuSectionDto,
        restaurantId: 1,
        images: [{ id: 1, image: 'test.jpg' }],
      };

      mockPrismaService.menuSection.create.mockResolvedValue(expectedResult);

      const result = await service.createSection(createMenuSectionDto, 1);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.menuSection.create).toHaveBeenCalledWith({
        data: {
          ...createMenuSectionDto,
          restaurantId: 1,
          images: {
            create: [{ image: 'test.jpg' }],
          },
        },
        include: {
          images: true,
        },
      });
    });
  });

  describe('findAllSections', () => {
    it('should return all menu sections for a restaurant', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Test Section',
          restaurantId: 1,
          images: [],
          items: [],
        },
      ];

      mockPrismaService.menuSection.findMany.mockResolvedValue(expectedResult);

      const result = await service.findAllSections(1);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.menuSection.findMany).toHaveBeenCalledWith({
        where: { restaurantId: 1 },
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
    });
  });

  describe('findOneSection', () => {
    it('should return a menu section by id', async () => {
      const expectedResult = {
        id: 1,
        name: 'Test Section',
        restaurantId: 1,
        images: [],
        items: [],
      };

      mockPrismaService.menuSection.findFirst.mockResolvedValue(expectedResult);

      const result = await service.findOneSection(1, 1);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.menuSection.findFirst).toHaveBeenCalledWith({
        where: { id: 1, restaurantId: 1 },
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
    });

    it('should throw NotFoundException when section is not found', async () => {
      mockPrismaService.menuSection.findFirst.mockResolvedValue(null);

      await expect(service.findOneSection(1, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateSection', () => {
    it('should update a menu section', async () => {
      const updateMenuSectionDto: UpdateMenuSectionDto = {
        name: 'Updated Section',
        images: [{ image: 'updated.jpg' }],
      };

      const expectedResult = {
        id: 1,
        ...updateMenuSectionDto,
        restaurantId: 1,
        images: [{ id: 1, image: 'updated.jpg' }],
      };

      mockPrismaService.menuSection.update.mockResolvedValue(expectedResult);

      const result = await service.updateSection(1, updateMenuSectionDto, 1);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.menuSection.update).toHaveBeenCalledWith({
        where: { id: 1, restaurantId: 1 },
        data: {
          name: 'Updated Section',
          images: {
            deleteMany: {},
            create: [{ image: 'updated.jpg' }],
          },
        },
        include: {
          images: true,
        },
      });
    });

    it('should throw NotFoundException when section is not found', async () => {
      mockPrismaService.menuSection.update.mockRejectedValue(new Error());

      await expect(service.updateSection(1, {}, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeSection', () => {
    it('should remove a menu section', async () => {
      const expectedResult = {
        id: 1,
        name: 'Test Section',
      };

      mockPrismaService.menuSection.delete.mockResolvedValue(expectedResult);

      const result = await service.removeSection(1, 1);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.menuSection.delete).toHaveBeenCalledWith({
        where: { id: 1, restaurantId: 1 },
      });
    });

    it('should throw NotFoundException when section is not found', async () => {
      mockPrismaService.menuSection.delete.mockRejectedValue(new Error());

      await expect(service.removeSection(1, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createMenuItem', () => {
    it('should create a menu item', async () => {
      const createMenuItemDto: CreateMenuItemDto = {
        name: 'Test Item',
        price: 10.99,
        images: [{ image: 'test.jpg' }],
        modifiers: [
          {
            name: 'Size',
            items: [{ name: 'Small', price: 10.99 }],
          },
        ],
      };

      const expectedResult = {
        id: 1,
        ...createMenuItemDto,
        sectionId: 1,
        images: [{ id: 1, image: 'test.jpg' }],
        modifiers: [
          {
            id: 1,
            name: 'Size',
            items: [{ id: 1, name: 'Small', price: 10.99 }],
          },
        ],
      };

      mockPrismaService.menuItem.create.mockResolvedValue(expectedResult);

      const result = await service.createMenuItem(createMenuItemDto, 1);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.menuItem.create).toHaveBeenCalledWith({
        data: {
          ...createMenuItemDto,
          sectionId: 1,
          images: {
            create: [{ image: 'test.jpg' }],
          },
          modifiers: {
            create: [
              {
                name: 'Size',
                items: {
                  create: [{ name: 'Small', price: 10.99 }],
                },
              },
            ],
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
    });
  });

  describe('findAllMenuItems', () => {
    it('should return all menu items for a section', async () => {
      const expectedResult = [
        {
          id: 1,
          name: 'Test Item',
          sectionId: 1,
          images: [],
          modifiers: [],
        },
      ];

      mockPrismaService.menuItem.findMany.mockResolvedValue(expectedResult);

      const result = await service.findAllMenuItems(1);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.menuItem.findMany).toHaveBeenCalledWith({
        where: { sectionId: 1 },
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
    });
  });

  describe('findOneMenuItem', () => {
    it('should return a menu item by id', async () => {
      const expectedResult = {
        id: 1,
        name: 'Test Item',
        sectionId: 1,
        images: [],
        modifiers: [],
      };

      mockPrismaService.menuItem.findFirst.mockResolvedValue(expectedResult);

      const result = await service.findOneMenuItem(1, 1);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.menuItem.findFirst).toHaveBeenCalledWith({
        where: { id: 1, sectionId: 1 },
        include: {
          images: true,
          modifiers: {
            include: {
              items: true,
            },
          },
        },
      });
    });

    it('should throw NotFoundException when menu item is not found', async () => {
      mockPrismaService.menuItem.findFirst.mockResolvedValue(null);

      await expect(service.findOneMenuItem(1, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateMenuItem', () => {
    it('should update a menu item', async () => {
      const updateMenuItemDto: UpdateMenuItemDto = {
        name: 'Updated Item',
        images: [{ image: 'updated.jpg' }],
        modifiers: [
          {
            name: 'Size',
            items: [{ name: 'Large', price: 15.99 }],
          },
        ],
      };

      const expectedResult = {
        id: 1,
        ...updateMenuItemDto,
        sectionId: 1,
        images: [{ id: 1, image: 'updated.jpg' }],
        modifiers: [
          {
            id: 1,
            name: 'Size',
            items: [{ id: 1, name: 'Large', price: 15.99 }],
          },
        ],
      };

      mockPrismaService.menuItem.update.mockResolvedValue(expectedResult);

      const result = await service.updateMenuItem(1, updateMenuItemDto, 1);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.menuItem.update).toHaveBeenCalledWith({
        where: { id: 1, sectionId: 1 },
        data: {
          name: 'Updated Item',
          images: {
            deleteMany: {},
            create: [{ image: 'updated.jpg' }],
          },
          modifiers: {
            deleteMany: {},
            create: [
              {
                name: 'Size',
                items: {
                  create: [{ name: 'Large', price: 15.99 }],
                },
              },
            ],
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
    });

    it('should throw NotFoundException when menu item is not found', async () => {
      mockPrismaService.menuItem.update.mockRejectedValue(new Error());

      await expect(service.updateMenuItem(1, {}, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('removeMenuItem', () => {
    it('should remove a menu item', async () => {
      const expectedResult = {
        id: 1,
        name: 'Test Item',
      };

      mockPrismaService.menuItem.delete.mockResolvedValue(expectedResult);

      const result = await service.removeMenuItem(1, 1);

      expect(result).toEqual(expectedResult);
      expect(mockPrismaService.menuItem.delete).toHaveBeenCalledWith({
        where: { id: 1, sectionId: 1 },
      });
    });

    it('should throw NotFoundException when menu item is not found', async () => {
      mockPrismaService.menuItem.delete.mockRejectedValue(new Error());

      await expect(service.removeMenuItem(1, 1)).rejects.toThrow(NotFoundException);
    });
  });
});
