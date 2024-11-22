import { ForbiddenException } from '@nestjs/common';

export class ForbiddenExceptionApp extends ForbiddenException {
  constructor(message: { message: string }) {
    super(message);
  }
}
