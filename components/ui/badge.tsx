import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

import { UI_COLORS } from "@/lib/constants";

const VARIANTS_COLORS = UI_COLORS.reduce(
  (acc, color) => {
    const style = `bg-${color}-500/10 text-${color}-500 selection:bg-${color}-500 selection:text-${color}-100 focus-visible:border-${color}-500 focus-visible:ring-${color}-500/50 dark:selection:text-${color}-900`;
    return {
      ...acc,
      [color]: style,
      [`outline-${color}`]: `${style} border-${color}-500/20 dark:border-${color}-500/20`,
    };
  },
  {} as Record<(typeof UI_COLORS)[number] | `outline-${(typeof UI_COLORS)[number]}`, string>,
);

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:ring-[3px] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground focus-visible:border-ring focus-visible:ring-ring/50 [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground focus-visible:border-ring focus-visible:ring-ring/50 [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline focus-visible:border-ring focus-visible:ring-ring/50",
        ...VARIANTS_COLORS,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props,
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants };
