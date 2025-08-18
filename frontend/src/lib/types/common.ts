// 공통 타입 정의
export type RenderFn = () => unknown;

// 공용 타입 정의 모음
export type Nullable<T> = T | null | undefined;

export type Brand<K, T> = K & { __brand: T };

// 컴포넌트 표준 Props (문서/일관성 용)
export type ComponentBaseProps = {
    id?: string;
    class?: string;
    'data-test'?: string;
};

export type FieldBaseProps = ComponentBaseProps & {
    label?: string;
    required?: boolean;
    error?: string;
};
