import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

interface PageHeroProps {
  image: string;
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  height?: "tall" | "short";
}

const PageHero = ({ image, eyebrow, title, subtitle, height = "short" }: PageHeroProps) => {
  return (
    <section className={`relative ${height === "tall" ? "h-[88vh]" : "h-[68vh] min-h-[500px]"} flex items-end overflow-hidden`}>
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />
      <div className="absolute inset-0 hero-overlay" aria-hidden />
      <div className="absolute inset-0 grain" aria-hidden />
      <div className="container-edge relative z-10 pb-16 md:pb-24 text-white">
        <Reveal>
          <div className="font-mono-accent text-[11px] text-accent mb-5">{eyebrow}</div>
        </Reveal>
        <Reveal delay={0.15} as="h1">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-architectural max-w-5xl text-balance">{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.3}>
            <p className="font-serif text-xl md:text-2xl text-white/85 max-w-2xl mt-6 leading-relaxed">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default PageHero;
