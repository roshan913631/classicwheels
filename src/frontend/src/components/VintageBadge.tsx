import { cn } from "@/lib/utils";

type BadgeVariant = "new" | "pending" | "replied" | "closed" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  new: "bg-primary text-primary-foreground border-primary",
  pending: "bg-accent text-accent-foreground border-accent",
  replied: "bg-secondary text-foreground border-border",
  closed: "bg-muted text-muted-foreground border-border",
  default: "bg-muted text-muted-foreground border-border",
};

export default function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block border font-display font-bold uppercase tracking-widest text-xs px-2.5 py-0.5",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
