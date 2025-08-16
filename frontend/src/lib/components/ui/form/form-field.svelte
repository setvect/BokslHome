<script lang="ts">
  import { Field } from 'formsnap';

  interface Props {
    form: any;
    name: string;
    children: any;
  }
  let { form, name, children }: Props = $props();
</script>

<Field {form} {name}>
  {@render children()}
</Field>