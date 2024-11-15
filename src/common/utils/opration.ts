import { NotFoundException } from '@nestjs/common';
import { IOprationResult, OpreationType } from '../interfaces/HttpResponse';
import { BadRequestExceptionApp } from '../exceptions';

export const operationProcessor = <T>(
  response: IOprationResult<T>,
): Omit<IOprationResult<T>, 'type' | 'fieldErrors'> => {
  const { type, ...errorResponse } = response;

  if (response.type === OpreationType.Error) {
    throw new BadRequestExceptionApp({
      fieldErrors: response.fieldErrors,
      message: response.message,
    });
  }

  if (response.type === OpreationType.NotFound) {
    throw new NotFoundException(errorResponse);
  }

  return {
    result: response.result,
    message: response.message,
  };
};

interface IOperationProps<T> {
  message?: string;
  result?: T;
  fieldErrors?: Record<string, string | string[]>;
}

const operationSuccess = <TData>({
  message = 'The operation was successful.',
  result,
  fieldErrors = null,
}: IOperationProps<TData>): IOprationResult<TData> => {
  return {
    message,
    fieldErrors,
    result: result,
    type: OpreationType.Success,
  };
};

const operationError = <TData>({
  message = 'The operation failed.',
  result = null,
  fieldErrors,
}: IOperationProps<TData>): IOprationResult<TData> => {
  return {
    result,
    fieldErrors,
    message,
    type: OpreationType.Error,
  };
};

export const Operation = {
  operationProcessor,
  operationSuccess,
  operationError,
};
