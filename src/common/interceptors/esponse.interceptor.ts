import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';
import { IHttpResponse, IOperationResult } from '../types/HttpResponse';

@Injectable()
export class ResponseInterceptor<T>
  implements
    NestInterceptor<
      Omit<IOperationResult<T>, 'type' | 'fieldErrors'>,
      IHttpResponse<T>
    >
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<Omit<IOperationResult<T>, 'type' | 'fieldErrors'>>,
  ): Observable<IHttpResponse<T>> {
    return next.handle().pipe(
      map((response) => {
        return {
          result: response.result,
          message: response.message,
          status: context.switchToHttp().getResponse().statusCode,
          requestId: uuid(),
        };
      }),
    );
  }
}
