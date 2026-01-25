/**
 * 쿠키 유틸리티 함수 (js-cookie 라이브러리 래핑)
 */

import Cookies from 'js-cookie';

/**
 * 쿠키 값 가져오기
 */
export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

/**
 * 쿠키 설정하기
 */
export function setCookie(name: string, value: string, days: number = 365): void {
  Cookies.set(name, value, {
    expires: days,
    path: '/',
    sameSite: 'lax',
  });
}

/**
 * 쿠키 삭제하기
 */
export function deleteCookie(name: string): void {
  Cookies.remove(name, { path: '/' });
}
