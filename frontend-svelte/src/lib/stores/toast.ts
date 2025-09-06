import { writable } from 'svelte/store';
import { mount } from 'svelte';
import ToastContainer from '$lib/components/ui/toast/ToastContainer.svelte';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

export const toasts = writable<Toast[]>([]);

let toastId = 0;
let toastContainerInstance: any = null;

// 브라우저 환경에서만 Toast 컨테이너를 초기화
function initializeToastContainer() {
  if (typeof document === 'undefined' || toastContainerInstance) {
    return;
  }

  // Toast 컨테이너를 위한 div 요소 생성
  const toastRoot = document.createElement('div');
  toastRoot.id = 'toast-root';
  document.body.appendChild(toastRoot);

  // ToastContainer 컴포넌트 마운트
  toastContainerInstance = mount(ToastContainer, {
    target: toastRoot,
    props: { position: 'top-right' }
  });
}

function createToast(toast: Omit<Toast, 'id'>): Toast {
  return {
    id: (++toastId).toString(),
    duration: 4000,
    ...toast
  };
}

export const toast = {
  success: (title: string, options?: { description?: string; duration?: number }) => {
    initializeToastContainer(); // Toast 사용 시 컨테이너 초기화

    const newToast = createToast({
      type: 'success',
      title,
      ...options
    });

    toasts.update((all) => [...all, newToast]);

    if (newToast.duration && newToast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(newToast.id);
      }, newToast.duration);
    }

    return newToast.id;
  },

  error: (title: string, options?: { description?: string; duration?: number }) => {
    initializeToastContainer();

    const newToast = createToast({
      type: 'error',
      title,
      ...options
    });

    toasts.update((all) => [...all, newToast]);

    if (newToast.duration && newToast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(newToast.id);
      }, newToast.duration);
    }

    return newToast.id;
  },

  warning: (title: string, options?: { description?: string; duration?: number }) => {
    initializeToastContainer();

    const newToast = createToast({
      type: 'warning',
      title,
      ...options
    });

    toasts.update((all) => [...all, newToast]);

    if (newToast.duration && newToast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(newToast.id);
      }, newToast.duration);
    }

    return newToast.id;
  },

  info: (title: string, options?: { description?: string; duration?: number }) => {
    initializeToastContainer();

    const newToast = createToast({
      type: 'info',
      title,
      ...options
    });

    toasts.update((all) => [...all, newToast]);

    if (newToast.duration && newToast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(newToast.id);
      }, newToast.duration);
    }

    return newToast.id;
  },

  promise: async <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    initializeToastContainer();

    const loadingId = createToast({
      type: 'info',
      title: options.loading,
      duration: Infinity
    });

    toasts.update((all) => [...all, loadingId]);

    try {
      const result = await promise;
      removeToast(loadingId.id);
      toast.success(options.success);
      return result;
    } catch (error) {
      removeToast(loadingId.id);
      toast.error(options.error);
      throw error;
    }
  }
};

export function removeToast(id: string) {
  toasts.update((all) => all.filter((toast) => toast.id !== id));
}
