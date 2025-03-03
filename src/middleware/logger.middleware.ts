import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from '../config/logger.config';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new CustomLogger();

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    this.logger.logRoute(method, originalUrl);
    next();
  }
} 