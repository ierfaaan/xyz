export class OperationResult<T> {
  isSuccess: boolean;
  isNotFound: boolean;
  data: T;
  errorMessage: Record<string, string> | string;

  success<T>(data: T): OperationResult<T> {
    return {
      error: this.error,
      notFound: this.notFound,
      success: this.success,
      data,
      errorMessage: {},
      isNotFound: false,
      isSuccess: true,
    };
  }

  error<T>(props: Record<string, string>): OperationResult<T> {
    return {
      error: this.error,
      notFound: this.notFound,
      success: this.success,
      data: null,
      errorMessage: props,
      isNotFound: false,
      isSuccess: false,
    };
  }

  notFound<T>(errorMessage: string): OperationResult<T> {
    return {
      error: this.error,
      notFound: this.notFound,
      success: this.success,
      data: null,
      errorMessage,
      isNotFound: true,
      isSuccess: false,
    };
  }
}

export const OperationResultObject = new OperationResult();