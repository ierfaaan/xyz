import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IResult } from 'src/models/common/operationResult';

export interface IHttpResponse<T> {
  result: T;
  requestId: string;
}
export class OperationResultMapper {
  mapToHttp<T>(oprationResult: IResult<T>): IHttpResponse<T> {
    if (!oprationResult.isSuccess)
      throw new BadRequestException({
        requestId: String(Math.random()),
        result: oprationResult.errorMessage,
      });

    if (oprationResult.isNotFound)
      throw new NotFoundException({
        requestId: String(Math.random()),
        result: oprationResult.errorMessage,
      });

    return {
      requestId: String(Math.random()),
      result: oprationResult.data,
    };
  }
}

export const OperationResultMapperObject = new OperationResultMapper();
