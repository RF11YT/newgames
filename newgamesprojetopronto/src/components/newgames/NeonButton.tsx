import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface NeonButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "neon" | "whatsapp" | "outline";
  size?: "sm" | "md" | "lg";
  ariaLabel?: string;
}

const sizes = {
  sm: "px-3.5 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function NeonButton({
  href,
  children,
  className,
  variant = "neon",
  size = "md",
  ariaLabel,
}: NeonButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        sizes[size],
        variant === "neon" &&
          "bg-gradient-neon text-primary-foreground shadow-[0_8px_28px_-10px_var(--neon-purple)] hover:glow-purple",
        variant === "whatsapp" &&
          "bg-whatsapp text-primary-foreground hover:shadow-[0_0_24px_-4px_var(--whatsapp)]",
        variant === "outline" &&
          "border border-neon-blue/50 bg-surface/60 text-foreground backdrop-blur hover:border-neon-magenta/70 hover:glow-magenta",
        className,
      )}
    >
      {children}
    </a>
  );
}
