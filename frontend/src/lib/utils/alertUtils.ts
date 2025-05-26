import Swal from 'sweetalert2';

/**
 * 확인/취소 경고 모달을 표시합니다.
 * @param title 모달 제목
 * @param text 모달 내용
 * @param confirmButtonText 확인 버튼 텍스트 (기본값: '확인')
 * @param cancelButtonText 취소 버튼 텍스트 (기본값: '취소')
 * @returns Promise<boolean> - 확인 시 true, 취소 시 false
 */
export async function showConfirmAlert(
  title: string,
  text: string,
  confirmButtonText: string = '확인',
  cancelButtonText: string = '취소'
): Promise<boolean> {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626', // red-600
    cancelButtonColor: '#6b7280', // gray-500
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    customClass: {
      popup: 'dark:bg-gray-800 dark:text-white',
      title: 'dark:text-white',
      htmlContainer: 'dark:text-gray-300',
      confirmButton: 'hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-800',
      cancelButton: 'hover:bg-gray-600 focus:ring-gray-300 dark:focus:ring-gray-700'
    }
  });

  return result.isConfirmed;
}

/**
 * 성공 메시지 모달을 표시합니다.
 * @param title 모달 제목
 * @param text 모달 내용 (선택사항)
 */
export async function showSuccessAlert(title: string, text?: string): Promise<void> {
  await Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonColor: '#059669', // green-600
    customClass: {
      popup: 'dark:bg-gray-800 dark:text-white',
      title: 'dark:text-white',
      htmlContainer: 'dark:text-gray-300',
      confirmButton: 'hover:bg-green-700 focus:ring-green-300 dark:focus:ring-green-800'
    }
  });
}

/**
 * 에러 메시지 모달을 표시합니다.
 * @param title 모달 제목
 * @param text 모달 내용 (선택사항)
 */
export async function showErrorAlert(title: string, text?: string): Promise<void> {
  await Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonColor: '#dc2626', // red-600
    customClass: {
      popup: 'dark:bg-gray-800 dark:text-white',
      title: 'dark:text-white',
      htmlContainer: 'dark:text-gray-300',
      confirmButton: 'hover:bg-red-700 focus:ring-red-300 dark:focus:ring-red-800'
    }
  });
}

/**
 * 정보 메시지 모달을 표시합니다.
 * @param title 모달 제목
 * @param text 모달 내용 (선택사항)
 */
export async function showInfoAlert(title: string, text?: string): Promise<void> {
  await Swal.fire({
    title,
    text,
    icon: 'info',
    confirmButtonColor: '#2563eb', // blue-600
    customClass: {
      popup: 'dark:bg-gray-800 dark:text-white',
      title: 'dark:text-white',
      htmlContainer: 'dark:text-gray-300',
      confirmButton: 'hover:bg-blue-700 focus:ring-blue-300 dark:focus:ring-blue-800'
    }
  });
}
