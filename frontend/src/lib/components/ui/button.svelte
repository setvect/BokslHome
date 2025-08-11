<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import { tv, type VariantProps } from "tailwind-variants";

  const buttonVariants = tv({
    base: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-all duration-200 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95",
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md active:bg-primary/80",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-md active:bg-destructive/80", 
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-sm active:bg-accent/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-sm active:bg-secondary/70",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-sm active:bg-accent/80",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80 active:text-primary/70",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  });

  interface Props extends HTMLButtonAttributes {
    variant?: VariantProps<typeof buttonVariants>["variant"];
    size?: VariantProps<typeof buttonVariants>["size"];
  }

  let className: string | undefined | null = undefined;
  export { className as class };
  export let variant: Props["variant"] = "default";
  export let size: Props["size"] = "default";
</script>

<button class={cn(buttonVariants({ variant, size, className }))} {...$$restProps} on:click>
  <slot />
</button>
