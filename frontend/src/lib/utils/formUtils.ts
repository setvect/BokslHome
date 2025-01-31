import { createForm } from '@felte/core';
import { validator } from '@felte/validator-zod';
import { writable } from 'svelte/store';
import { ZodSchema } from 'zod';

type Obj = Record<string, unknown>;

export function useForm<T extends Obj>(schema: ZodSchema<T>, initialValues: T, onSubmit: (values: T) => void) {
  return createForm<T>(
    {
      extend: [validator({ schema })],
      initialValues,
      onSubmit
    },
    {
      storeFactory: (store) => {
        const { subscribe, set, update } = writable(store);
        return {
          subscribe,
          set,
          update
        };
      }
    }
  );
}
