import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TResult } from 'src/models/common/operationResult';

export class OperationResultMapper {
  mapToHttp<T>(oprationResult: TResult<T>) {
    const oprationResultWithRequestId = {
      ...oprationResult,
      requestId: Math.random(),
    };

    if (!oprationResult.isSuccess)
      throw new BadRequestException(oprationResultWithRequestId);

    if (oprationResult.isNotFound)
      throw new NotFoundException(oprationResultWithRequestId);

    return oprationResultWithRequestId;
  }
}

export const OperationResultMapperObject = new OperationResultMapper();
