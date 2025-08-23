<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Search, X } from '@lucide/svelte';
  import { cn } from '$lib/utils.js';

  interface Props {
    class?: string;
    placeholder?: string;
    value?: string;
    loading?: boolean;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'ghost' | 'outline';
    onsearch?: (value: string) => void;
    onclear?: () => void;
    oninput?: (value: string) => void;
  }

  let {
    class: className,
    placeholder = 'Search...',
    value = $bindable(''),
    loading = false,
    disabled = false,
    size = 'md',
    variant = 'default',
    onsearch,
    onclear,
    oninput
  }: Props = $props();

  const dispatch = createEventDispatcher<{
    search: string;
    clear: void;
    input: string;
  }>();

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    value = target.value;
    dispatch('input', value);
    oninput?.(value);
  }

  function handleSearch() {
    dispatch('search', value);
    onsearch?.(value);
  }

  function handleClear() {
    value = '';
    dispatch('clear');
    dispatch('search', '');
    onclear?.();
    onsearch?.('');
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      handleClear();
    }
  }

  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base'
  };

  const variantClasses = {
    default: 'border border-input bg-background',
    ghost: 'border-0 bg-transparent',
    outline: 'border-2 border-input bg-transparent'
  };
</script>

<div class={cn('relative flex items-center', className)}>
  <div class="absolute left-3 flex items-center justify-center">
    <Search class="h-4 w-4 text-muted-foreground" />
  </div>
  
  <input
    type="text"
    {placeholder}
    {value}
    {disabled}
    class={cn(
      'flex w-full rounded-md px-10 py-2 font-medium text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      sizeClasses[size],
      variantClasses[variant],
      className
    )}
    oninput={handleInput}
    onkeydown={handleKeydown}
  />

  <div class="absolute right-3 flex items-center gap-1">
    {#if loading}
      <div class="h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent"></div>
    {:else if value}
      <button
        type="button"
        class="flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
        onclick={handleClear}
        aria-label="Clear search"
      >
        <X class="h-3 w-3" />
      </button>
    {/if}
  </div>
</div>