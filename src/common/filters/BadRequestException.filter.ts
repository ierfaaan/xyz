import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { IHttpResponse, IOperationResult } from '../types/HttpResponse';

@Catch(BadRequestException)
export class BadRequestExceptionGlobalFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse() as Omit<
      IOperationResult,
      'type'
    >;

    const httpResponse: IHttpResponse = {
      requestId: uuid(),
      status: HttpStatus.BAD_REQUEST,
      result: errorResponse.fieldErrors,
      message: errorResponse.message,
    };

    response.status(status).json(httpResponse);
  }
}
