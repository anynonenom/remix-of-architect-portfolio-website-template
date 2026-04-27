import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Users, MapPin } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { tours } from "@/data/tours";

const ToursShowcase = () => {
  const highlight = tours.slice(0, 6);

  return (
    <section className="relative py-28 md:py-36 bg-background overflow-hidden">
      {/* decorative script watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 right-4 md:right-16 font-script text-accent/10 text-[10rem] md:text-[16rem] leading-none select-none"
      >
        explore
      </div>

      <div className="container-edge relative">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Our signature tours</div>
          </Reveal>
          <Reveal delay={0.1} as="h2">
            <h2 className="font-display text-5xl md:text-7xl text-architectural text-primary-deep">
              Handpicked <span className="font-script text-accent text-6xl md:text-8xl italic">journeys</span> across Morocco
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-serif text-lg md:text-xl text-muted-foreground mt-6 leading-relaxed">
              From Sahara nights to coastal escapes — pick a path, or let us weave one just for you.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {highlight.map((tour) => (
            <StaggerItem key={tour.slug}>
              <Link
                to={`/tours/${tour.slug}`}
                className="group relative block bg-card overflow-hidden shadow-elegant hover:shadow-architectural transition-all duration-700 ease-out hover:-translate-y-1"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <motion.img
                    src={tour.hero}
                    alt={tour.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/85 via-primary-deep/10 to-transparent" />

                  {/* Region tag */}
                  <div className="absolute top-5 left-5 flex items-center gap-1.5 font-mono-accent text-[10px] text-white bg-white/10 backdrop-blur-md px-3 py-1.5 border border-white/20">
                    <MapPin className="h-3 w-3" /> {tour.region}
                  </div>

                  {/* Price badge */}
                  <div className="absolute top-5 right-5 bg-accent text-accent-foreground px-3 py-1.5 font-mono-accent text-[10px] shadow-gold">
                    from €{tour.price}
                  </div>

                  {/* Bottom content overlay */}
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <div className="font-script text-accent text-2xl mb-1">
                      {tour.days} {tour.days === 1 ? "day" : "days"}
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl text-architectural leading-tight">
                      {tour.title}
                    </h3>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute bottom-6 right-6 h-11 w-11 rounded-full bg-accent text-primary-deep grid place-items-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>

                <div className="p-6 md:p-7">
                  <p className="font-serif text-base text-muted-foreground leading-relaxed mb-5 line-clamp-2">
                    {tour.tagline}
                  </p>
                  <div className="flex items-center gap-5 pt-4 border-t border-border font-mono-accent text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-accent" /> {tour.level}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3 w-3 text-accent" /> {tour.groupSize}
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <div className="flex justify-center mt-16">
            <Link to="/tours" className="btn-gold group">
              View all tours
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ToursShowcase;
