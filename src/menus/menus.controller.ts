import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Restaurant } from '@prisma/client';

@Controller('menus')
@UseGuards(JwtAuthGuard)
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto, @Request() req) {
    const restaurant = req.user as Restaurant;
    return this.menusService.create(createMenuItemDto, restaurant.id);
  }

  @Get()
  findAll(@Request() req) {
    const restaurant = req.user as Restaurant;
    return this.menusService.findAll(restaurant.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const restaurant = req.user as Restaurant;
    return this.menusService.findOne(+id, restaurant.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
    @Request() req,
  ) {
    const restaurant = req.user as Restaurant;
    return this.menusService.update(+id, updateMenuItemDto, restaurant.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const restaurant = req.user as Restaurant;
    return this.menusService.remove(+id, restaurant.id);
  }
}
