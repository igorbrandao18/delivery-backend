import { LoggerService } from '@nestjs/common';
import * as chalk from 'chalk';

export class CustomLogger implements LoggerService {
  private moduleColors = {
    auth: chalk.cyan,
    restaurants: chalk.green,
    orders: chalk.yellow,
    users: chalk.magenta,
    default: chalk.white,
  };

  private getModuleColor(module: string) {
    return this.moduleColors[module] || this.moduleColors.default;
  }

  log(message: string, module: string = 'default') {
    const color = this.getModuleColor(module);
    console.log(color(message));
  }

  error(message: string, trace: string, module: string = 'default') {
    const color = this.getModuleColor(module);
    console.error(color(message));
    console.error(color(trace));
  }

  warn(message: string, module: string = 'default') {
    const color = this.getModuleColor(module);
    console.warn(color(message));
  }

  debug(message: string, module: string = 'default') {
    const color = this.getModuleColor(module);
    console.debug(color(message));
  }

  verbose(message: string, module: string = 'default') {
    const color = this.getModuleColor(module);
    console.log(color(message));
  }

  logRoute(method: string, url: string, module: string = 'default') {
    const methodColor = {
      GET: chalk.green,
      POST: chalk.blue,
      PUT: chalk.yellow,
      DELETE: chalk.red,
      PATCH: chalk.magenta,
    }[method] || chalk.white;

    const moduleColor = this.getModuleColor(module);
    const moduleName = module.toUpperCase().padEnd(10);

    console.log(
      `${methodColor(method.padEnd(7))} ${moduleColor(moduleName)} ${chalk.white(url)}`,
    );
  }
} 