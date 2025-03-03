import { LoggerService } from '@nestjs/common';
import * as chalk from 'chalk';

export class CustomLogger implements LoggerService {
  log(message: string) {
    console.log(chalk.blue(message));
  }

  error(message: string, trace: string) {
    console.error(chalk.red(message));
    console.error(chalk.red(trace));
  }

  warn(message: string) {
    console.warn(chalk.yellow(message));
  }

  debug(message: string) {
    console.debug(chalk.green(message));
  }

  verbose(message: string) {
    console.log(chalk.cyan(message));
  }

  logRoute(method: string, url: string) {
    const methodColor = {
      GET: chalk.green,
      POST: chalk.blue,
      PUT: chalk.yellow,
      DELETE: chalk.red,
      PATCH: chalk.magenta,
    }[method] || chalk.white;

    console.log(
      `${methodColor(method.padEnd(7))} ${chalk.white(url)}`,
    );
  }
} 