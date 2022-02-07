import { Unbrand } from "@/utils/Brand";

export type UseCaseError = [string, null];
export type UseCaseSuccess<T> = [null, T];
export type UseCaseResult<T> = UseCaseError | UseCaseSuccess<T>;
export type UseCase<Params, Return> = Params extends null
  ? () => Promise<UseCaseResult<Return>>
  : (params: Params) => Promise<UseCaseResult<Return>>;

const sanitizeUseCase = <T>(
  useCase: Promise<T>
): Promise<UseCaseResult<Unbrand<T>>> =>
  useCase
    .then((x) => [null, x] as UseCaseSuccess<Unbrand<T>>)
    .catch((err) => [String(err), null] as UseCaseError);

type RawUseCase<Params, Return> = Params extends null
  ? () => Promise<Return>
  : (params: Params) => Promise<Return>;

export const UseCase = <Params, Return>(
  rawUseCaseToSanitize: RawUseCase<Params, Return>
): UseCase<Params, Unbrand<Return>> =>
  ((params) => sanitizeUseCase(rawUseCaseToSanitize(params))) as UseCase<
    Params,
    Unbrand<Return>
  >;

export const hasError = <T>(error: string | null, _: T | null): _ is null =>
  error !== null;
