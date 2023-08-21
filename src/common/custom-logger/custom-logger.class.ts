import { ConsoleLogger } from '@nestjs/common';
import { writeToFile } from 'src/utils/writeFile';

export class CustomLogger extends ConsoleLogger {
  async error(message: any, ...optionalParams: any[]) {
    if (process.env.LOG_TARGET === 'file') {
      await writeToFile('errors.txt', JSON.stringify(message));
    }
    console.log('--- CustomLogger --->');
    super.error(message, ...optionalParams);
  }
}
