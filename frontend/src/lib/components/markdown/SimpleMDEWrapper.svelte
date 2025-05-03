<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Options } from 'easymde';
  import 'easymde/dist/easymde.min.css';  // CSS import 추가

  export let value: string = '';
  export let darkMode: boolean = false;
  
  let element: HTMLElement;
  let editor: EasyMDE | null = null;
  
  const options: Partial<Options> = {
    autofocus: true,
    spellChecker: false,
    status: false,
    toolbar: [
      'bold', 'italic', 'heading', '|',
      'quote', 'unordered-list', 'ordered-list', '|',
      'link', 'image', '|',
      'preview', 'side-by-side', 'fullscreen', '|',
      'guide'
    ]
  };
  
  onMount(async () => {
    if (typeof window !== 'undefined') {
      const EasyMDE = (await import('easymde')).default;
      editor = new EasyMDE({
        element,
        initialValue: value,
        ...options
      });
      
      editor.codemirror.on('change', () => {
        value = editor?.value() || '';
      });
    }
  });
  
  onDestroy(() => {
    if (editor) {
      editor.toTextArea();
      editor = null;
    }
  });
  
  $: if (editor && value !== editor.value()) {
    editor.value(value);
  }
</script>

<div class="simplemde-wrapper">
  <textarea bind:this={element}></textarea>
</div>

<style>
  .simplemde-wrapper {
    width: 100%;
  }
</style>