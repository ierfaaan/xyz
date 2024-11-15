import { BadRequestException } from '@nestjs/common';

export class BadRequestExceptionApp extends BadRequestException {
  constructor(message: {
    message: string;
    fieldErrors: Record<string, string | string[]>;
  }) {
    super(message);
  }
}
