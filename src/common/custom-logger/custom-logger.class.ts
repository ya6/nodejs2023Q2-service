import { ConsoleLogger } from '@nestjs/common';

export class CustomLogger extends ConsoleLogger {
  error(message: any, ...optionalParams: any[]) {
    // add output logic
    console.log('--- CustomLogger --->');

    super.error(message, ...optionalParams);
  }
}
