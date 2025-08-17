// 공용 타입 정의 모음
export type Nullable<T> = T | null | undefined;

export type Brand<K, T> = K & { __brand: T };


