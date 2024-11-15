import { HttpStatus } from '@nestjs/common';

export interface IHttpResponse<T = any> {
  result: T;
  status: HttpStatus;
  message: string;
  requestId: string;
}

export enum OpreationType {
  Success = 'success',
  Error = 'error',
  NotFound = 'notFound',
}

export interface IOprationResult<T = any> {
  result: T;
  type: OpreationType;
  message: string;
  fieldErrors?: Record<string, string | string[]>;
}
