import { useCallback, useReducer } from 'react';

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

type HistoryAction<T> =
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'SET'; newPresent: T }
  | { type: 'RESET'; initialPresent: T };

function historyReducer<T>(state: HistoryState<T>, action: HistoryAction<T>): HistoryState<T> {
  const { past, present, future } = state;

  switch (action.type) {
    case 'UNDO': {
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }
    case 'REDO': {
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }
    case 'SET': {
      const { newPresent } = action;
      if (newPresent === present) return state;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
    case 'RESET': {
      return {
        past: [],
        present: action.initialPresent,
        future: [],
      };
    }
    default:
      return state;
  }
}

export function useHistory<T>(initialPresent: T) {
  const [state, dispatch] = useReducer(historyReducer<T>, {
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;

  const undo = useCallback(() => dispatch({ type: 'UNDO' }), []);
  const redo = useCallback(() => dispatch({ type: 'REDO' }), []);
  const set = useCallback(
    (newPresent: T | ((current: T) => T)) => {
      if (typeof newPresent === 'function') {
        const updater = newPresent as (current: T) => T;
        dispatch({ type: 'SET', newPresent: updater(state.present) });
      } else {
        dispatch({ type: 'SET', newPresent });
      }
    },
    [state.present]
  ); // state.present 의존성 주의 (함수형 업데이트 시 최신 값 참조를 위해)

  // 위 useCallback 의존성 문제 해결을 위해 reducer 구조상 dispatch만 있으면 되지만,
  // 함수형 업데이트 내부에서 현재 값을 참조해야 하므로 dispatch wrapper에서 처리.
  // 더 정확히는, set 함수가 현재 상태를 알 필요가 있다면 의존성이 필요하지만,
  // reducer 패턴에서는 action payload로 값만 넘기면 되는데,
  // 함수형 업데이트 (prev => next)를 지원하려면 현재 값을 알아야 함.
  // 여기서는 간단하게 구현.

  // 수정: set 함수 내부에서 현재 값을 참조하려면 state.present가 필요함.
  // 하지만 set이 자주 재생성되는 것을 막기 위해 dispatch만 의존성으로 하고 싶다면?
  // reducer 내부에서 처리하도록 로직을 변경하거나,
  // 여기서는 간단히 state.present를 의존성에 넣음.

  const reset = useCallback((initialPresent: T) => {
    dispatch({ type: 'RESET', initialPresent });
  }, []);

  return {
    state: state.present,
    historyState: state, // 디버깅용
    set,
    undo,
    redo,
    canUndo,
    canRedo,
    reset,
  };
}

