import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomLogger } from './config/logger.config';

async function bootstrap() {
  const logger = new CustomLogger();
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  logger.log('Starting Nest application...', 'default');
  logger.log('AppModule dependencies initialized', 'default');
  logger.log('JwtModule dependencies initialized', 'auth');
  logger.log('AuthModule dependencies initialized', 'auth');
  logger.log('RestaurantsModule dependencies initialized', 'restaurants');

  const config = new DocumentBuilder()
    .setTitle('Delivery API')
    .setDescription('API para o sistema de delivery')
    .setVersion('1.0')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  logger.log('Nest application successfully started', 'default');
}
bootstrap(); 