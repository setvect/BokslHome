// 공용 유틸 함수와 타입을 export하는 엔트리 파일
export function noop(): void { }

export function isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined;
}
