import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variantClasses = {
  primary:
    "bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 font-display font-bold uppercase tracking-widest",
  secondary:
    "bg-card text-foreground border-2 border-primary hover:bg-primary hover:text-primary-foreground font-display font-bold uppercase tracking-widest",
  ghost:
    "bg-transparent text-primary border-2 border-transparent hover:border-primary font-display font-bold uppercase tracking-widest",
  danger:
    "bg-destructive text-destructive-foreground border-2 border-destructive hover:bg-destructive/90 font-display font-bold uppercase tracking-widest",
};

const sizeClasses = {
  sm: "py-1.5 px-4 text-xs",
  md: "py-2.5 px-6 text-sm",
  lg: "py-3.5 px-8 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={props.type ?? "button"}
      className={cn(
        "transition-smooth disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
