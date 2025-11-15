// src/components/ui/Button.tsx
import clsx from "clsx";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const styles = {
    primary: "bg-black text-white hover:bg-neutral-800 focus:ring-black",
    secondary:
      "bg-white border border-neutral-300 text-neutral-900 hover:bg-neutral-100 focus:ring-neutral-400",
    ghost: "hover:bg-neutral-100 text-neutral-700 focus:ring-neutral-300",
  };

  return (
    <button className={clsx(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}
