import { SetMetadata } from '@nestjs/common';

export const CustomError = (...args: string[]) => SetMetadata('error', args);
