import { useState } from "react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Seo } from "@/components/Seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-tours.jpg";
import riad from "@/assets/feature-riad.jpg";
import medina from "@/assets/feature-medina.jpg";
import atlas from "@/assets/feature-atlas.jpg";
import coast from "@/assets/feature-coast.jpg";
import sahara from "@/assets/hero-sahara.jpg";
import excursions from "@/assets/hero-excursions.jpg";

const tours = [
  { img: sahara, region: "Sahara", title: "Merzouga dunes & nomad nights", days: 4, price: 890, level: "Easy" },
  { img: riad, region: "Imperial cities", title: "Marrakech, Fes & Chefchaouen", days: 8, price: 1690, level: "Easy" },
  { img: atlas, region: "Atlas", title: "High Atlas Berber trek", days: 5, price: 1120, level: "Moderate" },
  { img: coast, region: "Coast", title: "Essaouira & Atlantic shores", days: 3, price: 640, level: "Easy" },
  { img: medina, region: "Culture", title: "Souks, hammams & saffron", days: 6, price: 1340, level: "Easy" },
  { img: excursions, region: "Marrakech", title: "Hot air balloon over palmeraie", days: 1, price: 220, level: "Easy" },
];

const filters = ["All", "Sahara", "Atlas", "Coast", "Imperial cities", "Culture", "Marrakech"];

const Tours = () => {
  const [active, setActive] = useState("All");
  const list = active === "All" ? tours : tours.filter((t) => t.region === active);

  return (
    <Layout>
      <Seo
        title="Signature Tours in Morocco — Bo Voyages"
        description="Curated multi-day journeys across Morocco — Sahara, Atlas mountains, imperial cities and Atlantic coast. Hand-built by local experts."
        path="/tours"
      />
      <PageHero
        image={heroImg}
        eyebrow="◆ Signature tours"
        title={<>Multi-day journeys, <em className="text-accent not-italic">slow and luminous</em>.</>}
        subtitle="A library of routes we have shaped over a decade — from desert nights to mountain dawns."
      />

      <section className="py-24 md:py-32 bg-background">
        <div className="container-edge">
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-12">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`font-mono-accent text-[10px] px-5 py-2.5 border transition-all duration-500 ${
                    active === f
                      ? "bg-primary-deep text-white border-primary-deep"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((t) => (
              <StaggerItem key={t.title}>
                <article className="group relative overflow-hidden bg-card">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={t.img}
                      alt={t.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-smooth group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/70 via-transparent to-transparent" />
                    <div className="absolute top-5 left-5 font-mono-accent text-[10px] text-white bg-white/10 backdrop-blur-md px-3 py-1.5 border border-white/20">
                      {t.region}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 border-t border-border">
                    <div className="flex items-center gap-4 font-mono-accent text-[10px] text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" />{t.days} days</span>
                      <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{t.level}</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl text-foreground mb-6">{t.title}</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-mono-accent text-[10px] text-muted-foreground">From</div>
                        <div className="font-display text-3xl text-primary-deep">€{t.price}</div>
                      </div>
                      <button className="h-12 w-12 rounded-full bg-accent text-primary-deep grid place-items-center transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight className="h-5 w-5" />
                      </button>
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

export default Tours;
