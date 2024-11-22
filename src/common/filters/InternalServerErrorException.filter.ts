import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuid } from 'uuid';
import { IHttpResponse } from '../types/HttpResponse';

@Catch(InternalServerErrorException)
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    console.error('Internal Server Error:', exception.message, exception.stack);

    const errorResponse: IHttpResponse = {
      requestId: uuid(),
      message: 'Internal Server Error',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      result: null,
    };

    response.status(status).json(errorResponse);
  }
}
