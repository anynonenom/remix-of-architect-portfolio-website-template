import { useState } from "react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import PageCta from "@/components/PageCta";
import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Mountain, Waves, Building2, Trees, Compass, ArrowUpRight, Clock, Users, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-excursions.jpg";
import sahara from "@/assets/hero-sahara.jpg";
import atlas from "@/assets/feature-atlas.jpg";
import coast from "@/assets/feature-coast.jpg";
import medina from "@/assets/feature-medina.jpg";
import riad from "@/assets/feature-riad.jpg";
import balloons from "@/assets/hero-excursions.jpg";
import ctaBg from "@/assets/exc-balloon.jpg";

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

const trust = [
  { icon: Clock, t: "Half-day to full-day", b: "Slot an excursion into any longer journey — we'll handle the logistics." },
  { icon: Users, t: "Private or shared", b: "Join a small group of like-minded travellers, or book it just for yours." },
  { icon: Sparkles, t: "Licensed local guides", b: "Every excursion is led by a storyteller who actually lives the place." },
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

      {/* 1. Intro — what is an excursion, why pick one */}
      <section className="py-20 md:py-24 bg-background border-b border-border">
        <div className="container-edge grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="font-mono-accent text-[11px] text-accent mb-4">◆ Small bites of Morocco</div>
            </Reveal>
            <Reveal delay={0.1} as="h2">
              <h2 className="font-display text-4xl md:text-6xl text-architectural">
                Perfect for <span className="font-script text-accent text-5xl md:text-7xl">a day</span>, unforgettable for a lifetime.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="lg:col-span-5">
            <p className="font-serif text-lg text-muted-foreground leading-relaxed">
              Excursions are bookable on their own or woven into any signature tour. Choose a terrain below, pick your morning — we'll take care of transport, tickets and the right local guide.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 2. Category picker */}
      <section className="py-20 md:py-24 bg-secondary">
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
                    <c.icon className="h-7 w-7 text-accent" />
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

      {/* 3. Excursion grid */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container-edge">
          <div className="flex items-end justify-between mb-10 gap-6">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl text-architectural">
                {active ? `${active} excursions` : "Our most-loved days out"}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="font-mono-accent text-[10px] text-muted-foreground">{filtered.length} experiences</div>
            </Reveal>
          </div>
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

      {/* 4. Reassurance strip */}
      <section className="py-20 md:py-24 bg-secondary border-t border-border">
        <div className="container-edge grid md:grid-cols-3 gap-8">
          {trust.map((p) => (
            <Reveal key={p.t}>
              <div className="p-8 bg-background border border-border h-full">
                <p.icon className="h-8 w-8 text-accent mb-5" />
                <h3 className="font-display text-2xl mb-2">{p.t}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. Closing CTA */}
      <PageCta
        image={ctaBg}
        eyebrow="◆ Ready to pick a morning?"
        title={<>One day is <em className="text-accent">all it takes</em>.</>}
        subtitle="Tell us your dates — we'll suggest the excursion that fits your mood, your group and the light."
        ctaLabel="Plan my day out"
        ctaTo="/contact"
        secondaryLabel="See multi-day tours"
        secondaryTo="/tours"
      />
    </Layout>
  );
};

export default Excursions;

