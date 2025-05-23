import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class LoggerService extends ConsoleLogger {
  error(message: string, trace: string) {
    // Add custom error handling logic here
    super.error(message, trace);
  }
  info(message: string, trace: string) {
    // Add custom error handling logic here
    super.log(message, trace);
  }
  warn(message: string, trace: string) {
    // Add custom error handling logic here
    super.warn(message, trace);
  }
  fatal(message: string, trace: string) {
    // Add custom error handling logic here
    super.fatal(message, trace);
  }
  success(message: string, trace: string) {
    // Add custom error handling logic here
    super.colorize(message, 'verbose');
  }
}
