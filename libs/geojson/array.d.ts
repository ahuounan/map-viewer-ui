export type TwoOrMore<T> = {
  0: T;
  1: T;
} & Array<T>;

export type FourOrMore<T> = {
  0: T;
  1: T;
  3: T;
  4: T;
} & Array<T>;
