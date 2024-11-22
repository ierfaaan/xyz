import { SetMetadata } from '@nestjs/common';

export const OperationName = (...roles: string[]) =>
  SetMetadata('operationName', roles);
