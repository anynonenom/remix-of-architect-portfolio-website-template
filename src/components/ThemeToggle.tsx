import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  variant?: "default" | "ghost-light";
  className?: string;
}

export function ThemeToggle({ variant = "default", className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  // Resolve current effective theme
  const effective = theme === "system"
    ? (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;

  const toggle = () => setTheme(effective === "light" ? "dark" : "light");

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${effective === "light" ? "dark" : "light"} mode`}
      className={cn(
        "relative h-10 w-10 grid place-items-center rounded-full transition-all duration-500 hover:scale-105",
        variant === "ghost-light"
          ? "border border-white/30 text-white hover:bg-white hover:text-primary-deep"
          : "border border-border text-foreground hover:border-accent hover:text-accent",
        className
      )}
    >
      <Sun className={cn("h-4 w-4 absolute transition-all duration-500", effective === "light" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0")} />
      <Moon className={cn("h-4 w-4 absolute transition-all duration-500", effective === "light" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")} />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
