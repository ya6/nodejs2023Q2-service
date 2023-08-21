import { Global, Module } from '@nestjs/common';

import { CustomLogger } from '../../common/custom-logger/custom-logger.class';

@Global()
@Module({
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class CustomLoggerModule {}
