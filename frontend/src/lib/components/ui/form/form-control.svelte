<script lang="ts">
  import { Control } from 'formsnap';

  interface Props {
    children: any;
  }
  let { children }: Props = $props();
</script>

<Control let:attrs>
  {@render children({ props: attrs })}
</Control>