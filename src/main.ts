import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './common/custom-logger/custom-logger.class';
import { HttpExeptionFilter } from './common/filters/http-exeption.filter';
import { CustomLoggerModule } from './modules/custom-logger/custom-logger.module';
import { writeToFile } from './utils/writeFile';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const logger = app
    .select(CustomLoggerModule)
    .get(CustomLogger, { strict: true });

  // -----conflict with tests(-----
  // app.useGlobalFilters(new HttpExeptionFilter(logger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.1.0')
    .addTag('Part 3')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  const configService = app.get(ConfigService);

  app.useLogger(app.get(CustomLogger));

  await app.listen(configService.get('PORT') || 4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
// -----conflict with tests(-----
// process.on('uncaughtException', async (error) => {
//   console.error('Uncaught Exception:', error);
//   if (process.env.LOG_TARGET === 'file') {
//     try {
//       await writeToFile('errors.txt', JSON.stringify(error));
//     } catch (error) {
//       console.error('Error writing to file:', error);
//     }
//   }
//   process.exit(1);
// });

// process.on('unhandledRejection', async (reason, promise) => {
//   console.error('Unhandled Promise Rejection:', reason);
//   if (process.env.LOG_TARGET === 'file') {
//     try {
//       await writeToFile('errors.txt', JSON.stringify(reason));
//     } catch (error) {
//       console.error('Error writing to file:', error);
//     }
//   }
// });

bootstrap();
