import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

type Props = {
  image: string;
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  ctaLabel?: string;
  ctaTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
};

const PageCta = ({
  image,
  eyebrow = "◆ Ready when you are",
  title,
  subtitle,
  ctaLabel = "Begin your custom journey",
  ctaTo = "/custom",
  secondaryLabel,
  secondaryTo,
}: Props) => {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-primary-deep/80" aria-hidden />
      <div className="absolute inset-0 grain" aria-hidden />
      <div className="container-edge relative text-center text-white">
        <Reveal>
          <div className="font-mono-accent text-[11px] text-accent mb-6">{eyebrow}</div>
        </Reveal>
        <Reveal delay={0.1} as="h2">
          <h2 className="font-display text-5xl md:text-7xl text-architectural max-w-4xl mx-auto text-balance">
            {title}
          </h2>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.2}>
            <p className="font-serif text-lg md:text-xl text-white/85 max-w-2xl mx-auto mt-8 leading-relaxed">
              {subtitle}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <Link to={ctaTo} className="btn-gold group">
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            {secondaryLabel && secondaryTo && (
              <Link to={secondaryTo} className="btn-ghost-light">
                {secondaryLabel}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default PageCta;
