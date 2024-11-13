export interface IResult<T> {
  isSuccess: boolean;
  isNotFound: boolean;
  data: T;
  errorMessage: Record<string, string>;
}

export class OperationResult {
  success<T>(data: T): IResult<T> {
    return {
      data,
      errorMessage: {},
      isNotFound: false,
      isSuccess: true,
    };
  }

  error<T>(props: Record<string, string>): IResult<T> {
    return {
      data: null,
      errorMessage: props,
      isNotFound: true,
      isSuccess: false,
    };
  }

  notFound<T>(errorMessage: string): IResult<T> {
    return {
      data: null,
      errorMessage: { s: errorMessage },
      isNotFound: true,
      isSuccess: false,
    };
  }
}

export const OperationResultObject = new OperationResult();
