import { CompressEither } from "./CompressEither";

const LEFT = Symbol("left");
const RIGHT = Symbol("right");

export type Left<E> = { value: E; type: typeof LEFT };
export type Right<A> = { value: A; type: typeof RIGHT };
export type Either<E, A> = Left<E> | Right<A>;

const compress: CompressEither = (eithers: any) => {
  const maybeLeft = eithers.find(Either.isLeft);

  if (maybeLeft) {
    return maybeLeft;
  }

  return Either.of(eithers.map(Either.getRight));
};

export const Either = {
  of<A>(value: A): Right<A> {
    return { value, type: RIGHT };
  },
  left<E>(value: E): Left<E> {
    return { value, type: LEFT };
  },
  isLeft<E, A>(either: Either<E, A>): either is Left<E> {
    return either.type === LEFT;
  },
  getLeft<E>(either: Left<E>): E {
    return either.value;
  },
  getRight<A>(either: Right<A>): A {
    return either.value;
  },
  getOrElse<E, A>(fn: (left: E) => A, either: Either<E, A>): A {
    return Either.isLeft(either) ? fn(either.value) : either.value;
  },
  fold<E, A, B>(
    onLeft: (e: E) => B,
    onRight: (a: A) => B,
    either: Either<E, A>
  ): B {
    return Either.isLeft(either)
      ? onLeft(Either.getLeft(either))
      : onRight(Either.getRight(either));
  },
  compress,
};
