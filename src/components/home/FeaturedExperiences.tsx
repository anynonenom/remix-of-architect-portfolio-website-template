import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import riad from "@/assets/feature-riad.jpg";
import medina from "@/assets/feature-medina.jpg";
import atlas from "@/assets/feature-atlas.jpg";
import coast from "@/assets/feature-coast.jpg";

const cards = [
  { img: riad, title: "Imperial cities & riads", duration: "8 days", tag: "Signature", to: "/tours" },
  { img: medina, title: "Marrakech medina at dusk", duration: "Half day", tag: "Excursion", to: "/excursions" },
  { img: atlas, title: "High Atlas trek", duration: "3 days", tag: "Adventure", to: "/tours" },
  { img: coast, title: "Essaouira coastal escape", duration: "2 days", tag: "Coast", to: "/tours" },
];

const FeaturedExperiences = () => {
  return (
    <section className="relative py-28 md:py-36 bg-background">
      <div className="container-edge">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Featured experiences</div>
            <h2 className="font-display text-5xl md:text-7xl text-architectural max-w-2xl">
              Journeys we'd take ourselves<span className="italic text-accent">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/tours" className="font-mono-accent text-[11px] link-underline self-start lg:self-auto">View all journeys →</Link>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Big card */}
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <Card item={cards[0]} large />
          </Reveal>
          {cards.slice(1).map((c, i) => (
            <Reveal key={c.title} delay={0.15 + i * 0.1}>
              <Card item={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Card = ({ item, large }: { item: typeof cards[number]; large?: boolean }) => (
  <Link to={item.to} className="group relative block overflow-hidden bg-primary-deep">
    <div className={`relative overflow-hidden ${large ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[680px]" : "aspect-[4/3]"}`}>
      <motion.img
        src={item.img}
        alt={item.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/95 via-primary-deep/30 to-transparent transition-opacity duration-700 group-hover:opacity-80" />
      <div className="absolute top-5 left-5 font-mono-accent text-[10px] text-white bg-white/10 backdrop-blur-md px-3 py-1.5 border border-white/20">
        {item.tag}
      </div>
      <div className="absolute inset-x-5 md:inset-x-8 bottom-6 md:bottom-8 text-white">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono-accent text-[10px] text-white/70 mb-3">
              <Clock className="h-3 w-3" /> {item.duration}
            </div>
            <h3 className={`font-display text-architectural ${large ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"}`}>
              {item.title}
            </h3>
          </div>
          <div className="h-12 w-12 shrink-0 rounded-full bg-accent text-primary-deep grid place-items-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default FeaturedExperiences;
