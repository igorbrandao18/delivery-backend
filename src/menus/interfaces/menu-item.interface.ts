import { MenuItemCategory } from '../dto/create-menu-item.dto';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: MenuItemCategory;
  createdAt: Date;
  updatedAt: Date;
} 