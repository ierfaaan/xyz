import { BadRequestException, NotFoundException } from '@nestjs/common';
import { OperationResult } from 'src/models';

export class OperationResultMapper {
  mapToHttp<T>(oprationResult: OperationResult<T>) {
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
