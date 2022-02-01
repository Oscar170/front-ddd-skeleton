const LEFT = Symbol("left");
const RIGHT = Symbol("right");

export type Left<E> = { value: E; type: typeof LEFT };
export type Right<A> = { value: A; type: typeof RIGHT };
export type Either<E, A> = Left<E> | Right<A>;

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
  getOrElse<E, A>(either: Either<E, A>, fn: (left: E) => A): A {
    return Either.isLeft(either) ? fn(either.value) : either.value;
  },
};
