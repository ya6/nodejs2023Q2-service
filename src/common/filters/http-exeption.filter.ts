import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { ValidationError } from 'class-validator';
import { Response } from 'express';
import { CustomLogger } from '../custom-logger/custom-logger.class';
import { writeToFile } from 'src/utils/writeFile';

@Catch()
export class HttpExeptionFilter implements ExceptionFilter {
  constructor(private customLogger: CustomLogger) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();

    const validation_exeptions = exception.getResponse() as {
      message: ValidationError[];
    };

    this.customLogger.error(validation_exeptions);
    if (process.env.LOG_TARGET === 'file') {
      try {
        await writeToFile('errors.txt', JSON.stringify(validation_exeptions));
      } catch (error) {
        console.error('Error writing to file:', error);
      }
    }

    if (status === 500) {
      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }

    response.status(status).json(validation_exeptions);
  }
}
