import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [AuthModule, RestaurantsModule, MenusModule],
})
export class AppModule {}