import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { CreateMenuSectionDto } from './dto/create-menu-section.dto';
import { UpdateMenuSectionDto } from './dto/update-menu-section.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Restaurant } from '@prisma/client';

@Controller('menus')
@UseGuards(JwtAuthGuard)
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  // Section endpoints
  @Post('sections')
  createSection(@Body() createMenuSectionDto: CreateMenuSectionDto, @Request() req) {
    const restaurant = req.user as Restaurant;
    return this.menusService.createSection(createMenuSectionDto, restaurant.id);
  }

  @Get('sections')
  findAllSections(@Request() req) {
    const restaurant = req.user as Restaurant;
    return this.menusService.findAllSections(restaurant.id);
  }

  @Get('sections/:id')
  findOneSection(@Param('id') id: string, @Request() req) {
    const restaurant = req.user as Restaurant;
    return this.menusService.findOneSection(+id, restaurant.id);
  }

  @Patch('sections/:id')
  updateSection(
    @Param('id') id: string,
    @Body() updateMenuSectionDto: UpdateMenuSectionDto,
    @Request() req,
  ) {
    const restaurant = req.user as Restaurant;
    return this.menusService.updateSection(+id, updateMenuSectionDto, restaurant.id);
  }

  @Delete('sections/:id')
  removeSection(@Param('id') id: string, @Request() req) {
    const restaurant = req.user as Restaurant;
    return this.menusService.removeSection(+id, restaurant.id);
  }

  // Menu item endpoints
  @Post('sections/:sectionId/items')
  createMenuItem(
    @Param('sectionId') sectionId: string,
    @Body() createMenuItemDto: CreateMenuItemDto,
  ) {
    return this.menusService.createMenuItem(createMenuItemDto, +sectionId);
  }

  @Get('sections/:sectionId/items')
  findAllMenuItems(@Param('sectionId') sectionId: string) {
    return this.menusService.findAllMenuItems(+sectionId);
  }

  @Get('sections/:sectionId/items/:id')
  findOneMenuItem(
    @Param('sectionId') sectionId: string,
    @Param('id') id: string,
  ) {
    return this.menusService.findOneMenuItem(+id, +sectionId);
  }

  @Patch('sections/:sectionId/items/:id')
  updateMenuItem(
    @Param('sectionId') sectionId: string,
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menusService.updateMenuItem(+id, updateMenuItemDto, +sectionId);
  }

  @Delete('sections/:sectionId/items/:id')
  removeMenuItem(
    @Param('sectionId') sectionId: string,
    @Param('id') id: string,
  ) {
    return this.menusService.removeMenuItem(+id, +sectionId);
  }
}
