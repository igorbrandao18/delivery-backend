import { Injectable } from '@nestjs/common';
import { CreateMenuDto, SectionDto, ItemDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  sections: SectionDto[];
}

@Injectable()
export class MenuService {
  private readonly menus: MenuItem[] = [];

  create(createMenuDto: CreateMenuDto) {
    const newMenu: MenuItem = { id: Date.now().toString(), ...createMenuDto };
    this.menus.push(newMenu);
    return newMenu;
  }

  findAll() {
    return this.menus;
  }

  findOne(id: string) {
    return this.menus.find(menu => menu.id === id);
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    const menuIndex = this.menus.findIndex(menu => menu.id === id);
    if (menuIndex > -1) {
      this.menus[menuIndex] = { ...this.menus[menuIndex], ...updateMenuDto };
      return this.menus[menuIndex];
    }
    return null;
  }

  remove(id: string) {
    const menuIndex = this.menus.findIndex(menu => menu.id === id);
    if (menuIndex > -1) {
      return this.menus.splice(menuIndex, 1);
    }
    return null;
  }
}
