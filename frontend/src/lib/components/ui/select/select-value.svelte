<script lang="ts">
	import { cn } from "$lib/utils";

	interface Props {
		ref?: any;
		class?: string;
		placeholder?: string;
		[key: string]: any;
	}

	let {
		ref = $bindable(null),
		class: className,
		placeholder,
		...restProps
	}: Props = $props();
</script>

<div
	bind:this={ref}
	data-slot="select-value"
	class={cn("block truncate", className)}
	{...restProps}
>
	{placeholder || ''}
</div>