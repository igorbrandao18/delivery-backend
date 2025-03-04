import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { MenuModule } from './modules/menu/menu.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { ReportsModule } from './modules/reports/reports.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    RestaurantsModule,
    MenuModule,
    PaymentsModule,
    OrdersModule,
    AddressesModule,
    ReportsModule,
  ],
})
export class AppModule {}