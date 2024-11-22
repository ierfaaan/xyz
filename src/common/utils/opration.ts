import { IOperationResult, OpreationType } from '../types/HttpResponse';
import { BadRequestExceptionApp } from '../exceptions';
import { NotFoundExceptionApp } from '../exceptions/NotFoundException';

const processor = <T>(
  response: IOperationResult<T>,
): Omit<IOperationResult<T>, 'type' | 'fieldErrors'> => {
  const { type, ...errorResponse } = response;

  if (response.type === OpreationType.Error) {
    throw new BadRequestExceptionApp({
      fieldErrors: response.fieldErrors,
      message: response.message,
    });
  }

  if (response.type === OpreationType.NotFound) {
    throw new NotFoundExceptionApp({ message: errorResponse.message });
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

const success = <TData>({
  message = 'The operation was successful.',
  result,
}: IOperationProps<TData>): IOperationResult<TData> => {
  return {
    message,
    fieldErrors: null,
    result: result,
    type: OpreationType.Success,
  };
};

const error = <TData>({
  message = 'The operation failed.',
  result = null,
  fieldErrors,
}: IOperationProps<TData>): IOperationResult<TData> => {
  return {
    result,
    fieldErrors,
    message,
    type: OpreationType.Error,
  };
};

const notFoundError = <TData>({
  message = 'notFound!',
}: IOperationProps<TData>): IOperationResult<TData> => {
  return {
    result: null,
    fieldErrors: null,
    message,
    type: OpreationType.NotFound,
  };
};
const forbiddenError = <TData>({
  message = 'You do not have permission to perform this operation',
}: IOperationProps<TData>): IOperationResult<TData> => {
  return {
    result: null,
    fieldErrors: null,
    message,
    type: OpreationType.ForbiddenError,
  };
};

export const Operation = {
  processor,
  success,
  error,
  notFoundError,
  forbiddenError,
};
