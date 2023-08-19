import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as querystring from 'querystring';

@Injectable()
export class CustomLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
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

    next();
  }
}
