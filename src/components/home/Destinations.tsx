import { Link } from "react-router-dom";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import marrakech from "@/assets/feature-medina.jpg";
import sahara from "@/assets/tour-merzouga.jpg";
import atlas from "@/assets/tour-atlas.jpg";
import coast from "@/assets/tour-coast.jpg";
import chef from "@/assets/tour-chefchaouen.jpg";
import fes from "@/assets/feature-riad.jpg";

const regions = [
  { name: "Marrakech", count: "12 journeys", img: marrakech },
  { name: "Sahara", count: "8 journeys", img: sahara },
  { name: "Atlas Mountains", count: "6 journeys", img: atlas },
  { name: "Atlantic Coast", count: "5 journeys", img: coast },
  { name: "Chefchaouen", count: "3 journeys", img: chef },
  { name: "Fes & Meknes", count: "7 journeys", img: fes },
];

const Destinations = () => {
  return (
    <section className="relative py-28 md:py-36 bg-secondary">
      <div className="container-edge">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <Reveal>
              <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Destinations</div>
            </Reveal>
            <Reveal delay={0.1} as="h2">
              <h2 className="font-display text-5xl md:text-7xl text-architectural text-primary-deep">
                <span className="font-script text-accent italic text-6xl md:text-8xl">Where</span> will your story begin?
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="font-serif text-lg text-muted-foreground max-w-md">
              Six regions. Countless moments. Pick a landscape and let us paint the days around it.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {regions.map((r) => (
            <StaggerItem key={r.name}>
              <Link
                to="/tours"
                className="group relative block aspect-[4/5] overflow-hidden"
              >
                <img
                  src={r.img}
                  alt={r.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-primary-deep/30 to-transparent transition-opacity duration-700 group-hover:from-primary-deep/70" />
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <div className="font-script text-accent text-xl md:text-2xl mb-1 opacity-90">
                    {r.count}
                  </div>
                  <h3 className="font-display text-2xl md:text-4xl text-architectural">
                    {r.name}
                  </h3>
                  <div className="h-px w-0 group-hover:w-16 bg-accent transition-all duration-700 mt-3" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default Destinations;
