import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomLoggerMiddleware } from 'src/common/middleware/custom-logger.middleware';
import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from 'src/common/guards/auth/auth.guard';

@Module({
  //   providers: [
  //     {
  //       provide: APP_GUARD,
  //       useClass: AuthGuard,
  //     },
  //   ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomLoggerMiddleware).forRoutes('*');
  }
}
