import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomLoggerMiddleware } from 'src/common/middleware/custom-logger.middleware';

@Module({})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomLoggerMiddleware).forRoutes('*');
  }
}
