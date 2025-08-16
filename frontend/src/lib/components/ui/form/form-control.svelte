<script lang="ts">
  import { Control } from 'formsnap';

  interface Props {
    children: any;
  }
  let { children: childrenSnippet }: Props = $props();
</script>

<Control>
  {#snippet children(attrs)}
    {@render childrenSnippet({ props: attrs })}
  {/snippet}
</Control>