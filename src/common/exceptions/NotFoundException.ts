import { NotFoundException } from '@nestjs/common';

export class NotFoundExceptionApp extends NotFoundException {
  constructor(message: { message: string }) {
    super(message);
  }
}
