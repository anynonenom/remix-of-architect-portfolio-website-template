import { motion, useInView, useReducedMotion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "h1" | "h2" | "h3" | "p" | "span" | "li";
  once?: boolean;
}

export const Reveal = ({ children, delay = 0, y = 32, className, as = "div", once = true }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });
  const reduce = useReducedMotion();
  const Comp: any = motion[as];

  return (
    <Comp
      ref={ref}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </Comp>
  );
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

export const Stagger = ({ children, className, delay = 0, staggerChildren = 0.12 }: StaggerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className, y = 24 }: { children: ReactNode; className?: string; y?: number }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);
