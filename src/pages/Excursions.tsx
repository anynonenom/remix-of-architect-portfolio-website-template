import { useState } from "react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Mountain, Waves, Building2, Trees, Compass, ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-excursions.jpg";
import sahara from "@/assets/hero-sahara.jpg";
import atlas from "@/assets/feature-atlas.jpg";
import coast from "@/assets/feature-coast.jpg";
import medina from "@/assets/feature-medina.jpg";
import riad from "@/assets/feature-riad.jpg";
import balloons from "@/assets/hero-excursions.jpg";

const categories = [
  { key: "Desert", icon: Compass, count: 8 },
  { key: "Mountains", icon: Mountain, count: 6 },
  { key: "Coast", icon: Waves, count: 5 },
  { key: "City", icon: Building2, count: 9 },
  { key: "Cultural", icon: Trees, count: 7 },
];

const items = [
  { img: sahara, title: "Sunset camel ride, Erg Chebbi", duration: "3 hrs", level: "Easy", cat: "Desert" },
  { img: balloons, title: "Hot air balloon, Marrakech", duration: "4 hrs", level: "Easy", cat: "City" },
  { img: atlas, title: "Ourika valley waterfalls hike", duration: "Full day", level: "Moderate", cat: "Mountains" },
  { img: coast, title: "Essaouira fishing harbour", duration: "Half day", level: "Easy", cat: "Coast" },
  { img: medina, title: "Marrakech souk masterclass", duration: "3 hrs", level: "Easy", cat: "Cultural" },
  { img: riad, title: "Hammam & mint tea ceremony", duration: "2 hrs", level: "Easy", cat: "Cultural" },
  { img: atlas, title: "Imlil Berber village trek", duration: "Full day", level: "Moderate", cat: "Mountains" },
  { img: sahara, title: "Sandboarding the dunes", duration: "Half day", level: "Active", cat: "Desert" },
];

const Excursions = () => {
  const [active, setActive] = useState<string | null>(null);
  const filtered = active ? items.filter((i) => i.cat === active) : items;

  return (
    <Layout>
      <Seo
        title="Day Excursions in Morocco — Bo Voyages"
        description="Hand-picked half-day and full-day excursions across desert, mountain, coast and city. Small groups, local guides, unforgettable moments."
        path="/excursions"
      />
      <PageHero
        image={heroImg}
        eyebrow="◆ Day excursions"
        title={<>A single day, <em className="text-accent not-italic">a thousand worlds</em>.</>}
        subtitle="Pick the morning, we'll handle the rest — from balloon flights at dawn to candlelit hammams at dusk."
      />

      <section className="py-24 bg-secondary">
        <div className="container-edge">
          <Reveal>
            <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Choose your terrain</div>
          </Reveal>
          <Reveal delay={0.1} as="h2">
            <h2 className="font-display text-4xl md:text-5xl text-architectural mb-12 max-w-2xl">Where will the day take you?</h2>
          </Reveal>
          <Stagger className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((c) => {
              const isActive = active === c.key;
              return (
                <StaggerItem key={c.key}>
                  <button
                    onClick={() => setActive(isActive ? null : c.key)}
                    className={`group w-full aspect-square p-6 border flex flex-col items-start justify-between transition-all duration-500 ${
                      isActive
                        ? "bg-primary-deep text-white border-primary-deep"
                        : "bg-background border-border hover:border-accent hover:-translate-y-1 hover:shadow-elegant"
                    }`}
                  >
                    <c.icon className={`h-7 w-7 ${isActive ? "text-accent" : "text-accent"}`} />
                    <div className="text-left">
                      <div className="font-display text-2xl">{c.key}</div>
                      <div className={`font-mono-accent text-[10px] mt-1 ${isActive ? "text-white/60" : "text-muted-foreground"}`}>{c.count} excursions</div>
                    </div>
                  </button>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-background">
        <div className="container-edge">
          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((e, i) => (
              <StaggerItem key={e.title + i}>
                <article className={`group relative overflow-hidden ${i % 3 === 1 ? "lg:mt-12" : ""}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-primary-deep">
                    <img src={e.img} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/90 via-primary-deep/20 to-transparent" />
                    <div className="absolute inset-x-6 bottom-6 text-white">
                      <div className="font-mono-accent text-[10px] text-accent mb-2">{e.cat} · {e.level}</div>
                      <h3 className="font-display text-2xl md:text-3xl mb-4">{e.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="font-mono-accent text-[10px] text-white/70">{e.duration}</span>
                        <span className="font-mono-accent text-[10px] link-underline flex items-center gap-2">Learn more <ArrowUpRight className="h-3 w-3" /></span>
                      </div>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </Layout>
  );
};

export default Excursions;
