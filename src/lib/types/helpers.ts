export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export type FilterPropertiesByKey<T, Key extends string> = {
  [K in keyof T as K extends `${string}${Key}${string}` ? K : never]: T[K];
};
