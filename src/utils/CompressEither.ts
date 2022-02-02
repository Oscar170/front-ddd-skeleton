import { Either } from "./Either";

export type CompressEither = {
  (eithers: []): Either<never, []>;
  <B1, A1>(eithers: [Either<B1, A1>]): Either<B1, [A1]>;
  <B1, A1, B2, A2>(eithers: [Either<B1, A1>, Either<B2, A2>]): Either<
    B1 | B2,
    [A1, A2]
  >;
  <B1, A1, B2, A2, B3, A3>(
    eithers: [Either<B1, A1>, Either<B2, A2>, Either<B3, A3>]
  ): Either<B1 | B2 | B3, [A1, A2, A3]>;
  <B1, A1, B2, A2, B3, A3, B4, A4>(
    eithers: [Either<B1, A1>, Either<B2, A2>, Either<B3, A3>, Either<B4, A4>]
  ): Either<B1 | B2 | B3 | B4, [A1, A2, A3, A4]>;
  <B1, A1, B2, A2, B3, A3, B4, A4, B5, A5>(
    eithers: [
      Either<B1, A1>,
      Either<B2, A2>,
      Either<B3, A3>,
      Either<B4, A4>,
      Either<B5, A5>
    ]
  ): Either<B1 | B2 | B3 | B4 | B5, [A1, A2, A3, A4, A5]>;
  <B1, A1, B2, A2, B3, A3, B4, A4, B5, A5, B6, A6>(
    eithers: [
      Either<B1, A1>,
      Either<B2, A2>,
      Either<B3, A3>,
      Either<B4, A4>,
      Either<B5, A5>,
      Either<B6, A6>
    ]
  ): Either<B1 | B2 | B3 | B4 | B5 | B6, [A1, A2, A3, A4, A5, A6]>;
  <B1, A1, B2, A2, B3, A3, B4, A4, B5, A5, B6, A6, B7, A7>(
    eithers: [
      Either<B1, A1>,
      Either<B2, A2>,
      Either<B3, A3>,
      Either<B4, A4>,
      Either<B5, A5>,
      Either<B6, A6>,
      Either<B7, A7>
    ]
  ): Either<B1 | B2 | B3 | B4 | B5 | B6 | B7, [A1, A2, A3, A4, A5, A6, A7]>;

  <B1, A1, B2, A2, B3, A3, B4, A4, B5, A5, B6, A6, B7, A7, B8, A8>(
    eithers: [
      Either<B1, A1>,
      Either<B2, A2>,
      Either<B3, A3>,
      Either<B4, A4>,
      Either<B5, A5>,
      Either<B6, A6>,
      Either<B7, A7>,
      Either<B8, A8>
    ]
  ): Either<
    B1 | B2 | B3 | B4 | B5 | B6 | B7 | B8,
    [A1, A2, A3, A4, A5, A6, A7, A8]
  >;

  <B1, A1, B2, A2, B3, A3, B4, A4, B5, A5, B6, A6, B7, A7, B8, A8, B9, A9>(
    eithers: [
      Either<B1, A1>,
      Either<B2, A2>,
      Either<B3, A3>,
      Either<B4, A4>,
      Either<B5, A5>,
      Either<B6, A6>,
      Either<B7, A7>,
      Either<B8, A8>,
      Either<B9, A9>
    ]
  ): Either<
    B1 | B2 | B3 | B4 | B5 | B6 | B7 | B8 | B9,
    [A1, A2, A3, A4, A5, A6, A7, A8, A9]
  >;

  <
    B1,
    A1,
    B2,
    A2,
    B3,
    A3,
    B4,
    A4,
    B5,
    A5,
    B6,
    A6,
    B7,
    A7,
    B8,
    A8,
    B9,
    A9,
    B10,
    A10
  >(
    eithers: [
      Either<B1, A1>,
      Either<B2, A2>,
      Either<B3, A3>,
      Either<B4, A4>,
      Either<B5, A5>,
      Either<B6, A6>,
      Either<B7, A7>,
      Either<B8, A8>,
      Either<B9, A9>,
      Either<B10, A10>
    ]
  ): Either<
    B1 | B2 | B3 | B4 | B5 | B6 | B7 | B8 | B9 | B10,
    [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10]
  >;
};
