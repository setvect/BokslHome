<script>
  import '../../../app.pcss';
  import MetaTag from '../../utils/MetaTag.svelte';
</script>

<MetaTag title="마크다운 에디터" />

<div class="h-[calc(100vh)] w-full overflow-y-auto">
  <slot />
</div>
