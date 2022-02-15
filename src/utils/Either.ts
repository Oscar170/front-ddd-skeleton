import { Sequence } from "./SequenceArrayEither";

const LEFT = Symbol("left");
const RIGHT = Symbol("right");

export type EitherMethods<E, A> = {
  map<B>(onRight: (value: A) => B): Either<E, B>;
  mapLeft<B>(onLeft: (value: E) => B): Either<B, A>;
  getOrElse(fn: (left: E) => A): A;
  fold<B>(onLeft: (e: E) => B, onRight: (a: A) => B): B;
  getValue(): E | A;
};

export type Either<E, A> = Left<E, A> | Right<E, A>;

class Left<E, A> implements EitherMethods<E, A> {
  private value: E;
  type = LEFT;

  constructor(value: E) {
    this.value = value;
  }
  map<B>(): Either<E, B> {
    return this as unknown as Either<E, B>;
  }
  mapLeft<B>(onLeft: (value: E) => B): Either<B, A> {
    return new Left(onLeft(this.value));
  }
  getOrElse(fn: (left: E) => A): A {
    return fn(this.value);
  }
  fold<B>(onLeft: (e: E) => B, onRight: (a: A) => B): B {
    return onLeft(this.value);
  }
  getValue(): E {
    return this.value;
  }
}

class Right<E, A> implements EitherMethods<E, A> {
  private value: A;
  type = RIGHT;

  constructor(value: A) {
    this.value = value;
  }
  map<B>(onRight: (value: A) => B): Either<E, B> {
    return new Right(onRight(this.value));
  }
  mapLeft<B>(): Either<B, A> {
    return this as unknown as Either<B, A>;
  }
  getOrElse(): A {
    return this.value;
  }
  fold<B>(onLeft: (e: E) => B, onRight: (a: A) => B): B {
    return onRight(this.value);
  }
  getValue(): A {
    return this.value;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sequenceArray: Sequence = (eithers: any) => {
  const maybeLeft = eithers.find(Either.isLeft);

  if (maybeLeft) {
    return maybeLeft;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Either.of(eithers.map((either: any) => either.getValue()));
};

export const Either = {
  of<A>(value: A): Right<never, A> {
    return new Right(value);
  },
  left<E>(value: E): Left<E, never> {
    return new Left(value);
  },
  isLeft<E, A>(either: Either<E, A>): either is Left<E, A> {
    return either.type === LEFT;
  },
  all: sequenceArray,
};
