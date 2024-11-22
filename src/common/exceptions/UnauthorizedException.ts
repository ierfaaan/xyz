import { UnauthorizedException } from '@nestjs/common';

export class UnauthorizedExceptionApp extends UnauthorizedException {
  constructor(message: { message: string }) {
    super(message);
  }
}
