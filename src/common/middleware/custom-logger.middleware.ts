import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { writeToFile } from '../../utils/writeFile';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomLoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: () => void) {
    //add logic

    const { originalUrl, params, query, body } = req;

    const { statusCode } = res;
    const log = `url: ${req.get(
      'host',
    )}${originalUrl},  query: ${JSON.stringify(query)}, body: ${JSON.stringify(
      body,
    )},  response Status Code: ${statusCode}`;

    console.log('--- CustomLogger --->');
    console.dir(log);

    if (process.env.LOG_TARGET === 'file') {
      await writeToFile('logs.txt', log);
    }

    next();
  }
}
