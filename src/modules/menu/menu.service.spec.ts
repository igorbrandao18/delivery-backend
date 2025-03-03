import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuService],
    }).compile();

    service = module.get<MenuService>(MenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new menu item', () => {
      const createMenuDto: CreateMenuDto = {
        name: 'Pizza',
        description: 'Delicious cheese pizza',
        price: 10,
        image: 'pizza.jpg',
        category: 'Main Course',
      };
      const result = service.create(createMenuDto);
      expect(result).toHaveProperty('id');
      expect(result.name).toEqual(createMenuDto.name);
    });
  });

  describe('findAll', () => {
    it('should return an array of menu items', () => {
      const createMenuDto: CreateMenuDto = {
        name: 'Pizza',
        description: 'Delicious cheese pizza',
        price: 10,
        image: 'pizza.jpg',
        category: 'Main Course',
      };
      service.create(createMenuDto);
      const result = service.findAll();
      expect(result.length).toBe(1);
    });
  });

  describe('findOne', () => {
    it('should return a menu item by id', () => {
      const createMenuDto: CreateMenuDto = {
        name: 'Pizza',
        description: 'Delicious cheese pizza',
        price: 10,
        image: 'pizza.jpg',
        category: 'Main Course',
      };
      const menuItem = service.create(createMenuDto);
      const result = service.findOne(menuItem.id);
      expect(result).toEqual(menuItem);
    });
  });

  describe('update', () => {
    it('should update a menu item', () => {
      const createMenuDto: CreateMenuDto = {
        name: 'Pizza',
        description: 'Delicious cheese pizza',
        price: 10,
        image: 'pizza.jpg',
        category: 'Main Course',
      };
      const menuItem = service.create(createMenuDto);
      const updateMenuDto: UpdateMenuDto = { price: 12 };
      const result = service.update(menuItem.id, updateMenuDto);
      expect(result).not.toBeNull();
      if (result) {
        expect(result.price).toEqual(12);
      }
    });
  });

  describe('remove', () => {
    it('should remove a menu item', () => {
      const createMenuDto: CreateMenuDto = {
        name: 'Pizza',
        description: 'Delicious cheese pizza',
        price: 10,
        image: 'pizza.jpg',
        category: 'Main Course',
      };
      const menuItem = service.create(createMenuDto);
      const result = service.remove(menuItem.id);
      expect(result).toHaveLength(1);
      expect(service.findOne(menuItem.id)).toBeUndefined();
    });
  });
});
