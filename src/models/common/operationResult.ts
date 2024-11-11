type Newable = { new (...args: readonly unknown[]): unknown };
type AnyFn = (...args: unknown[]) => unknown;

type ClassProperties<C extends Newable> = {
  [K in keyof InstanceType<C> as InstanceType<C>[K] extends AnyFn
    ? never
    : K]: InstanceType<C>[K];
};

export class OperationResult<T> {
  isSuccess: boolean;
  isNotFound: boolean;
  data: T;
  errorMessage: Record<string, string>;

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
      isNotFound: true,
      isSuccess: false,
    };
  }

  notFound<T>(errorMessage: string): OperationResult<T> {
    return {
      error: this.error,
      notFound: this.notFound,
      success: this.success,
      data: null,
      errorMessage: { s: errorMessage },
      isNotFound: true,
      isSuccess: false,
    };
  }
}

export type TResult<T> = ClassProperties<typeof OperationResult<T>>;

export const OperationResultObject = new OperationResult();
