import { SetMetadata } from '@nestjs/common';
import { ProjectOperations, TeamOperations } from '../constants/operations';

export const OperationName = (
  operationName:
    | (typeof TeamOperations)[keyof typeof TeamOperations]
    | ProjectOperations,
) => SetMetadata('operationName', operationName);
