import Control from "./form-control.svelte";
import Description from "./form-description.svelte";
import Field from "./form-field.svelte";
import FieldErrors from "./form-field-errors.svelte";
import Label from "./form-label.svelte";

export {
  Control,
  Description,
  Field,
  FieldErrors,
  Label,
  //
  Control as FormControl,
  Description as FormDescription,
  Field as FormField,
  FieldErrors as FormFieldErrors,
  Label as FormLabel,
};

export const Form = {
  Control,
  Description,
  Field,
  FieldErrors,
  Label,
};