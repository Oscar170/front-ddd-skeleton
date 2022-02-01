export type UseCaseError = [string, null];
export type UseCaseSuccess<T> = [null, T];
export type UseCase<Params, Return> = Params extends null
  ? () => Promise<UseCaseError | UseCaseSuccess<Return>>
  : (params: Params) => Promise<UseCaseError | UseCaseSuccess<Return>>;

export const sanitizeUseCase = <T>(
  useCase: Promise<T>
): Promise<UseCaseError | UseCaseSuccess<T>> =>
  useCase
    .then((x) => [null, x] as UseCaseSuccess<T>)
    .catch((err) => [String(err), null] as UseCaseError);

export const hasError = <T>(error: string | null, _: T | null): _ is null =>
  error !== null;
