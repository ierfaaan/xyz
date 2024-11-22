import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { IHttpResponse, IOperationResult } from '../types/HttpResponse';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
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
      status: HttpStatus.NOT_FOUND,
      result: null,
      message: errorResponse.message,
    };

    response.status(status).json(httpResponse);
  }
}
