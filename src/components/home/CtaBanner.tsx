import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import bg from "@/assets/feature-atlas.jpg";

const CtaBanner = () => {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-primary-deep/80" aria-hidden />
      <div className="absolute inset-0 grain" aria-hidden />
      <div className="container-edge relative text-center text-white">
        <Reveal>
          <div className="font-mono-accent text-[11px] text-accent mb-6">◆ Your story, our atlas</div>
        </Reveal>
        <Reveal delay={0.1} as="h2">
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-architectural max-w-4xl mx-auto text-balance">
            What if your next journey<br />was the one you remember<span className="italic text-accent"> always</span>?
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <Link to="/custom" className="btn-gold mt-12 group">
            Begin your custom journey
            <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default CtaBanner;
