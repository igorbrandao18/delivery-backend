import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [AuthModule, RestaurantsModule],
})
export class AppModule {}