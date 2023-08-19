import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './common/custom-logger/custom-logger.class';
import { HttpExeptionFilter } from './common/filters/http-exeption.filter';
import { CustomLoggerModule } from './modules/custom-logger/custom-logger.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const logger = app
    .select(CustomLoggerModule)
    .get(CustomLogger, { strict: true });
  app.useGlobalFilters(new HttpExeptionFilter(logger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addTag('Part 1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  const configService = app.get(ConfigService);

  app.useLogger(app.get(CustomLogger));

  await app.listen(configService.get('PORT') || 4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
});

bootstrap();
